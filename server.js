const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// -------- RISK LOGIC --------
function calculateRisk(data) {
  let risk = 0;

  if (data.codeChurn > 50) risk += 30;
  if (data.complexity > 7) risk += 30;
  if (data.bugs > 5) risk += 20;
  if (!data.hasTests) risk += 20;

  return risk;
}

// -------- API ROUTE --------
app.post("/risk", (req, res) => {
  const { codeChurn, complexity, bugs } = req.body;

  if (codeChurn < 0 || complexity < 0 || bugs < 0) {
    return res.status(400).json({ error: "Values cannot be negative" });
  }

  const riskScore = calculateRisk(req.body);

  let riskLevel = "Low";
  if (riskScore > 70) riskLevel = "High";
  else if (riskScore > 40) riskLevel = "Medium";

  res.json({ riskScore, riskLevel });
});

// -------- SERVE REACT BUILD --------
const buildPath = path.join(__dirname, "client", "build");

app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// -------- START SERVER --------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});