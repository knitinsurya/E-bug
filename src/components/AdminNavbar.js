import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/adminlogin");
  };

  return (
    <nav className="admin-navbar">
      <h1 className="admin-logo">Admin Panel</h1>
      <div className="admin-nav-links">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/manage-bugs">Manage Bugs</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
