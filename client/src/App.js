import React, { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./App.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function App() {
  const [codeChurn, setCodeChurn] = useState(0);
  const [complexity, setComplexity] = useState(0);
  const [bugs, setBugs] = useState(0);
  const [hasTests, setHasTests] = useState(false);
  const [riskData, setRiskData] = useState(null);
  const [history, setHistory] = useState([]);

  const calculateRisk = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/risk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codeChurn: Number(codeChurn),
          complexity: Number(complexity),
          bugs: Number(bugs),
          hasTests,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.error);
        return;
      }

      const data = await response.json();
      setRiskData(data);

      setHistory((prevHistory) => [
        ...prevHistory,
        {
          ...data,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      alert("Backend not reachable");
    }
  };

  const getColorClass = (level) => {
    if (level === "High") return "risk-high";
    if (level === "Medium") return "risk-medium";
    return "risk-low";
  };

  const chartData = {
    labels: history.map((item) => item.time),
    datasets: [
      {
        label: "Risk Score Trend",
        data: history.map((item) => item.riskScore),
        borderColor: "#66a3ff",
        backgroundColor: "rgba(102, 163, 255, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <h1>🚀 Dev Risk Dashboard</h1>
        <p className="subtitle">Analyze deployment risk with a clean, dark, and focused interface.</p>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="codeChurn">Code Churn</label>
            <input
              id="codeChurn"
              type="number"
              value={codeChurn}
              onChange={(e) => setCodeChurn(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="complexity">Complexity</label>
            <input
              id="complexity"
              type="number"
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="bugs">Number of Bugs</label>
            <input
              id="bugs"
              type="number"
              value={bugs}
              onChange={(e) => setBugs(e.target.value)}
            />
          </div>

          <div className="form-field checkbox-field">
            <label htmlFor="hasTests">
              <input
                id="hasTests"
                type="checkbox"
                checked={hasTests}
                onChange={(e) => setHasTests(e.target.checked)}
              />
              Has Automated Tests
            </label>
          </div>
        </div>

        <button className="calculate-btn" onClick={calculateRisk}>
          Calculate Risk
        </button>

        {riskData && (
          <div className="result-card">
            <h2 className={getColorClass(riskData.riskLevel)}>Risk Score: {riskData.riskScore}</h2>
            <h3 className={getColorClass(riskData.riskLevel)}>Risk Level: {riskData.riskLevel}</h3>
          </div>
        )}

        {history.length > 0 && (
          <>
            <div className="panel chart-panel">
              <h2>📊 Risk Trend</h2>
              <Line data={chartData} />
            </div>

            <div className="panel">
              <h2>📋 Risk History</h2>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Score</th>
                    <th>Level</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr key={index}>
                      <td>{item.time}</td>
                      <td>{item.riskScore}</td>
                      <td className={getColorClass(item.riskLevel)}>{item.riskLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
