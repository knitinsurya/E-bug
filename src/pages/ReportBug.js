import { useState, useContext } from "react";
import { BugContext } from "../context/BugContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./ReportBug.css";

const ReportBug = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const { addBug } = useContext(BugContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    addBug({ id: uuidv4(), title, description, priority });
    navigate("/bugs");
  };

  return (
    <div className="report-container">
      <div className="report-box">
        <h2 className="report-title">🐞 Report a Bug</h2>
        <form onSubmit={handleSubmit} className="report-form">
          <input
            type="text"
            placeholder="Bug Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="Bug Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea-field"
          ></textarea>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="select-field"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReportBug;
