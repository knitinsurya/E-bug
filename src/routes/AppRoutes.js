import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import BugList from "../pages/BugList";
import BugDetails from "../pages/BugDetails";
import ReportBug from "../pages/ReportBug";
import Login from "../pages/Login";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../admin/AdminDashboard";
import ManageBugs from "../admin/ManageBugs";
import AdminNavbar from "../components/AdminNavbar";
import BugForm from "../pages/BugForm";
import FileUpload from "../pages/File";
import Auth from "../components/Auth";
import FolderUpload from "../pages/FolderUpload";
const AppRoutes = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") && location.pathname !== "/adminlogin";

  return (
    <div className="app-container">
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <div className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/bugs" element={<BugList />} />
          <Route path="/bugs/:id" element={<BugDetails />} />
          <Route path="/report" element={<ReportBug />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bugform" element={<BugForm />} />
          <Route path="/fileupload" element={<FileUpload />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/folderupload" element={<FolderUpload />} />

          {/* Admin Routes */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-bugs" element={<ManageBugs />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />} {/* Footer is only shown for non-admin pages */}
    </div>
  );
};

export default AppRoutes;
