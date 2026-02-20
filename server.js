const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Risk Calculation Logic
function calculateRisk(data) {
    let risk = 0;

    if (data.codeChurn > 50) risk += 30;
    if (data.complexity > 7) risk += 30;
    if (data.bugs > 5) risk += 20;
    if (!data.hasTests) risk += 20;

    return risk;
}

// API Endpoint with Validation
app.post('/risk', (req, res) => {
    const { codeChurn, complexity, bugs, hasTests } = req.body;

    // Validation
    if (
        codeChurn < 0 ||
        complexity < 0 ||
        bugs < 0
    ) {
        return res.status(400).json({
            error: "Values cannot be negative"
        });
    }

    const riskScore = calculateRisk(req.body);

    let riskLevel = "Low";

    if (riskScore > 70) {
        riskLevel = "High";
    } else if (riskScore > 40) {
        riskLevel = "Medium";
    }

    res.json({
        riskScore,
        riskLevel
    });
});

// Start Server
app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});