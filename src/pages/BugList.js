import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import "./BugList.css";
import { FaBug, FaCodeBranch, FaFolder, FaChevronDown, FaChevronUp, FaInfoCircle } from "react-icons/fa";

const BugList = () => {
    const [bugs, setBugs] = useState([]);
    const [expandedBugId, setExpandedBugId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBugs = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.from("bug").select("*");
                if (error) throw error;
                setBugs(data);
            } catch (err) {
                setError("Failed to fetch bugs.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBugs();
    }, []);

    const toggleExpand = (id) => {
        setExpandedBugId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="bug-list-container">
            <h2 className="page-title"><FaBug /> Bug Tracker Dashboard</h2>

            {loading && <p className="loading">Loading bugs...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && bugs.length === 0 && <p className="no-bugs">🎉 No bugs detected. Clean code!</p>}

            {bugs.map((bug) => (
                <div key={bug.id} className="bug-card">
                    <div className="bug-main">
                        <div className="bug-icon"><FaFolder /></div>
                        <div className="bug-details">
                            <h3 className="filename">{bug.file_name}</h3>
                            <p><FaCodeBranch /> <strong>Location:</strong> {bug.file_path}</p>
                            <p><span className="line-number">📍 Line {bug.line_number}</span></p>
                            <p className="error-text">❌ {bug.error_message}</p>
                        </div>
                        <button
                            className="toggle-btn"
                            onClick={() => toggleExpand(bug.id)}
                        >
                            {expandedBugId === bug.id ? <>Hide <FaChevronUp /></> : <>View More <FaChevronDown /></>}
                        </button>
                    </div>

                    {expandedBugId === bug.id && (
                        <div className="bug-extra">
                            <p><FaInfoCircle /> <strong>Bug Type:</strong> {bug.bug_type || "Unknown"}</p>
                            <p>💡 <strong>Suggested Fix:</strong> <em>{bug.suggested_fix || "Not provided"}</em></p>
                            <p>📊 <strong>Confidence:</strong> {bug.confidence || "N/A"}</p>
                            <p>🕒 <strong>Detected At:</strong> {new Date(bug.detected_at).toLocaleString()}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BugList;