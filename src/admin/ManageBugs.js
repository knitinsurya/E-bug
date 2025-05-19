import { useContext } from "react";
import { BugContext } from "../context/BugContext";
import "./ManageBugs.css";

const ManageBugs = () => {
  const { bugs, updateBugStatus, deleteBug } = useContext(BugContext);

  const handleDelete = (bugId) => {
    if (window.confirm("Are you sure you want to delete this bug?")) {
      deleteBug(bugId);
    }
  };

  return (
    <div className="manage-bugs">
      <h2>Manage Bugs</h2>
      {bugs.length === 0 ? (
        <p className="no-bugs-message">No bugs reported yet.</p>
      ) : (
        <table className="bugs-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug) => (
              <tr key={bug.id}>
                <td>{bug.title}</td>
                <td>{bug.description}</td>
                <td className={`priority-${(bug.priority || "low").toLowerCase()}`}>
  {bug.priority || "Low"}
</td>

                <td>
                  <select
                    value={bug.status}
                    onChange={(e) => updateBugStatus(bug.id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(bug.id)}
                    className="delete-button"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageBugs;
