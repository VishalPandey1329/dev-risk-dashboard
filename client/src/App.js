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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [codeChurn, setCodeChurn] = useState(0);
  const [complexity, setComplexity] = useState(0);
  const [bugs, setBugs] = useState(0);
  const [hasTests, setHasTests] = useState(false);
  const [riskData, setRiskData] = useState(null);
  const [history, setHistory] = useState([]);

  const calculateRisk = async () => {
    try {
      const response = await fetch("http://localhost:5000/risk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codeChurn: Number(codeChurn),
          complexity: Number(complexity),
          bugs: Number(bugs),
          hasTests: hasTests,
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

  const getColor = (level) => {
    if (level === "High") return "red";
    if (level === "Medium") return "orange";
    return "green";
  };

  const chartData = {
    labels: history.map((item) => item.time),
    datasets: [
      {
        label: "Risk Score Trend",
        data: history.map((item) => item.riskScore),
        borderColor: "blue",
        backgroundColor: "lightblue",
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      padding: "40px",
      fontFamily: "Arial",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>
      <div style={{
        width: "800px",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ textAlign: "center" }}>🚀 Dev Risk Dashboard</h1>

        <div style={{ marginBottom: "10px" }}>
          <label>Code Churn:</label>
          <input type="number" value={codeChurn} onChange={(e) => setCodeChurn(e.target.value)} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Complexity:</label>
          <input type="number" value={complexity} onChange={(e) => setComplexity(e.target.value)} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Number of Bugs:</label>
          <input type="number" value={bugs} onChange={(e) => setBugs(e.target.value)} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            <input type="checkbox" checked={hasTests} onChange={(e) => setHasTests(e.target.checked)} />
            Has Tests?
          </label>
        </div>

        <button onClick={calculateRisk} style={{
          marginTop: "10px",
          padding: "8px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Calculate Risk
        </button>

        {riskData && (
          <div style={{ marginTop: "20px" }}>
            <h2 style={{ color: getColor(riskData.riskLevel) }}>
              Risk Score: {riskData.riskScore}
            </h2>
            <h3 style={{ color: getColor(riskData.riskLevel) }}>
              Risk Level: {riskData.riskLevel}
            </h3>
          </div>
        )}

        {history.length > 0 && (
          <>
            <div style={{ marginTop: "30px" }}>
              <h2>📊 Risk Trend</h2>
              <Line data={chartData} />
            </div>

            <div style={{ marginTop: "30px" }}>
              <h2>📋 Risk History</h2>
              <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "center" }}>
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
                      <td style={{ color: getColor(item.riskLevel) }}>
                        {item.riskLevel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;