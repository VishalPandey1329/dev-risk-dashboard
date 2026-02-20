# 🚀 Dev Risk Dashboard

A full-stack DevOps Risk Monitoring Dashboard that evaluates software deployment risk based on engineering metrics such as code churn, complexity, bug count, and test coverage.

This project simulates how real DevOps teams assess release stability before deployment.

---

## 📌 Project Overview

The Dev Risk Dashboard calculates a weighted risk score based on multiple software quality indicators and classifies it into:

- 🟢 Low Risk  
- 🟠 Medium Risk  
- 🔴 High Risk  

It also maintains historical tracking and visualizes risk trends using interactive charts.

---

## 🧠 Risk Calculation Logic

Risk score is computed based on:

- High Code Churn → +30
- High Complexity → +30
- High Bug Count → +20
- No Test Coverage → +20

The system includes backend validation to prevent invalid inputs (e.g., negative values).

---

## 🛠 Tech Stack

### Frontend
- React.js
- Chart.js (Data Visualization)
- Fetch API

### Backend
- Node.js
- Express.js
- CORS
- REST API

### Version Control
- Git
- GitHub

---

## ✨ Features

- ✅ Risk scoring engine
- ✅ Risk classification (Low / Medium / High)
- ✅ Backend validation
- ✅ Error handling
- ✅ Historical risk tracking
- ✅ Trend visualization (Line Chart)
- ✅ Clean and responsive dashboard layout

---

## 📊 How It Works

1. User inputs project metrics.
2. Frontend sends data to backend via POST request.
3. Backend validates inputs.
4. Risk score is calculated.
5. Result is returned and displayed.
6. History is stored in state and visualized via chart.

---

## 🖥️ How To Run Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/VishalPandey1329/dev-risk-dashboard.git
cd dev-risk-dashboard
