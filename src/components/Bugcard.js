import { Link } from "react-router-dom";

const BugCard = ({ bug }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="text-lg font-bold">{bug.title}</h3>
      <p className="text-sm text-gray-600">{bug.priority} priority</p>
      <Link to={`/bugs/${bug.id}`} className="text-blue-500">View Details</Link>
    </div>
  );
};

export default BugCard;