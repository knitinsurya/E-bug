import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import bugReportImage from "./bugreport.png";
import bugicon from "./bug1.png";
import "./Home.css";

const bugData = [
  { name: "Open", value: 10 },
  { name: "In Progress", value: 7 },
  { name: "Resolved", value: 15 },
];

const COLORS = ["#FF5733", "#FFC300", "#28A745"];

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`home-page ${darkMode ? "dark" : ""}`}>
      {/* Floating 3D Robot */}
     

      


      {/* Animated Bug */}
      <img src={bugicon} alt="Animated Bug" className="animated-bug" />

      {/* Dark Mode Toggle */}
      <div className="dark-mode-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
        <span>{darkMode ? "🌙 Dark Mode" : "🌞 Light Mode"}</span>
      </div>

      {/* Hero Section */}
      <header className="hero-section">
        <h1 className="home-title">🚀 Welcome to E-Bug Tracker</h1>
        <p className="home-subtitle">
          Track, manage, and resolve bugs faster, smarter, and easier.
        </p>
        <button className="home-button" onClick={() => navigate("/login")}>Get Started</button>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Use E-Bug Tracker?</h2>
        <div className="features-grid">
          <div className="feature-box">🐞 <h3>Bug Detection</h3> <p>Auto-scan uploaded files and detect line-level issues.</p></div>
          <div className="feature-box">🧠 <h3>AI Suggestions</h3> <p>Get possible causes and best-practice fixes instantly.</p></div>
          <div className="feature-box">🔍 <h3>Precise Location</h3> <p>See bug file path, line number, and exact error.</p></div>
          <div className="feature-box">🧰 <h3>Smart Dashboard</h3> <p>Powerful admin tools to manage and fix bugs easily.</p></div>
          <div className="feature-box">📊 <h3>Real-time Stats</h3> <p>Visualize bug trends with live data charts.</p></div>
          <div className="feature-box">⚙️ <h3>Responsive Design</h3> <p>Works beautifully across all screen sizes.</p></div>
        </div>
      </section>

      {/* Extra Info Section */}
      <section className="info-section">
        <h2 className="section-title">What Makes Us Special?</h2>
        <ul className="info-list">
          <li>✅ Fully integrated with Supabase for real-time storage & retrieval</li>
          <li>✅ Upload entire folders & files to scan for bugs</li>
          <li>✅ Elegant bug reporting form for manual entry</li>
          <li>✅ AI-powered bug descriptions and fix suggestions</li>
          <li>✅ Supports bug removal & status tracking</li>
          <li>✅ Clean and modern UI with light/dark themes</li>
        </ul>
      </section>

      {/* Bug Statistics Section */}
      <section className="stats-section">
        <h2 className="section-title">Bug Report Overview</h2>
        <div className="stats-container">
          <div className="chart-box">
            <h3>Bug Status Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bugData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-box">
            <h3>Bug Status Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={bugData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                  {bugData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Bug Reporting CTA */}
      <section className="report-section">
        <h2 className="section-title">Found a Bug?</h2>
        <div className="report-content">
          <img src={bugReportImage} alt="Bug Report" className="bug-image" />
          <p>Submit your bug report and help us squash it! Your contribution makes the app stronger 💪</p>
          <button onClick={() => navigate("/bugform")} className="report-button">Report a Bug</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
