import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { BugContext } from "../context/BugContext";
import "./BugDetails.css";
const BugDetails = () => {
  const { id } = useParams();
  const { bugs } = useContext(BugContext);
  const [showMore, setShowMore] = useState(false); // State to toggle more details

  const bug = bugs.find((b) => b.id === id);

  if (!bug) return <p>Bug not found!</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold">{bug.title}</h2>
      <p className="mt-2">{bug.description}</p>
      <p className="mt-2"><strong>Priority:</strong> {bug.priority}</p>

      {/* "View More" Button */}
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "View Less" : "View More"}
      </button>

      {/* Additional Details */}
      {showMore && (
        <div className="mt-4 border-t pt-4">
          <p><strong>Severity:</strong> {bug.severity}</p>
          <p><strong>Operating System:</strong> {bug.os}</p>
          <p><strong>Browser/Device:</strong> {bug.browser}</p>
          <p><strong>Environment:</strong> {bug.environment}</p>
          <p><strong>Reported By:</strong> {bug.reporter}</p>
          <p><strong>Status:</strong> {bug.status}</p>
          <p><strong>Reported On:</strong> {new Date(bug.createdAt.seconds * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default BugDetails;
