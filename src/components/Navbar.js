import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase"; // Ensure this is imported

import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">🚀 E-Bug Tracker</h1>

      <div className="nav-links">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/bugs" className="nav-link">Bugs</NavLink>
        <NavLink to="/bugform" className="nav-link">Report Bug</NavLink>
        <NavLink to="/fileupload" className="nav-link">Upload a File</NavLink>
        <NavLink to="/folderupload" className="nav-link">Upload a Folder</NavLink>

        {user ? (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to="/login" className="login-button">Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
