import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [bugStats, setBugStats] = useState({ pending: 0, resolved: 0 });

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bugs"));
        const bugList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBugs(bugList);

        // Count pending and resolved bugs
        const pendingCount = bugList.filter((bug) => bug.status === "Pending").length;
        const resolvedCount = bugList.filter((bug) => bug.status === "Resolved").length;

        setBugStats({ pending: pendingCount, resolved: resolvedCount });
      } catch (error) {
        console.error("Error fetching bugs:", error);
      }
    };

    fetchBugs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/adminlogin");
  };

  const data = [
    { name: "Pending Bugs", value: bugStats.pending },
    { name: "Resolved Bugs", value: bugStats.resolved },
  ];

  const COLORS = ["#FF5733", "#28A745"]; // Colors for pending (red) and resolved (green)

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="admin-overview">
        <div className="bug-summary">
          <h3>Bug Summary</h3>
          <p>🐞 Total Bugs: {bugs.length}</p>
          <p>🟠 Pending: {bugStats.pending}</p>
          <p>✅ Resolved: {bugStats.resolved}</p>
        </div>

        <div className="bug-chart">
          <h3>Bug Status Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="admin-links">
        <Link to="/admin/managebugs">Manage Bugs</Link>
        <Link to="/admin/manageusers">Manage Users</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
