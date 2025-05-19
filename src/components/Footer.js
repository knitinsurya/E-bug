import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} E-Bug Tracker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
