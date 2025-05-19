import React, { useState } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";
import "./BugForm.css";

const BugForm = () => {
    const [bugTitle, setBugTitle] = useState("");
    const [bugDescription, setBugDescription] = useState("");
    const [severity, setSeverity] = useState("Low");
    const [priority, setPriority] = useState("Low");
    const [os, setOs] = useState("Windows"); // Default OS
    const [browser, setBrowser] = useState("");
    const [environment, setEnvironment] = useState("Development");
    const [screenshot, setScreenshot] = useState("");
    const [reporter, setReporter] = useState("");
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility

    // Function to add bug to Firestore
    const addBug = async (e) => {
        e.preventDefault(); // Prevent form default submit behavior
        if (bugTitle && bugDescription && reporter) {
            try {
                // Add bug to Firestore
                await addDoc(collection(db, "bugs"), {
                    title: bugTitle,
                    description: bugDescription,
                    severity,
                    priority,
                    os,
                    browser,
                    environment,
                    screenshot,
                    reporter,
                    status: "Open",
                    createdAt: new Date(),
                });

                // Show popup
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds

                console.log("Bug added!");
                // Clear form fields after submission
                setBugTitle("");
                setBugDescription("");
                setSeverity("Low");
                setPriority("Low");
                setOs("Windows"); // Reset OS to default
                setBrowser("");
                setEnvironment("Development");
                setScreenshot("");
                setReporter("");
            } catch (error) {
                console.error("Error adding bug: ", error);
            }
        } else {
            console.log("Please fill out all required fields.");
        }
    };

    return (
        <div>
            <form onSubmit={addBug} className="bug-form">
                <label>Bug Title</label>
                <input
                    type="text"
                    placeholder="Bug Title"
                    value={bugTitle}
                    onChange={(e) => setBugTitle(e.target.value)}
                    required
                />
                
                <label>Description</label>
                <textarea
                    placeholder="Bug Description"
                    value={bugDescription}
                    onChange={(e) => setBugDescription(e.target.value)}
                    required
                />

                <label>Severity:</label>
                <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>

                <label>Priority:</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                </select>

                <label>Operating System:</label>
                <select value={os} onChange={(e) => setOs(e.target.value)}>
                    <option value="Windows">Windows</option>
                    <option value="Mac">Mac</option>
                    <option value="Linux">Linux</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="text"
                    placeholder="Browser/Device (e.g., Chrome v115, iOS 16)"
                    value={browser}
                    onChange={(e) => setBrowser(e.target.value)}
                />

                <label>Environment:</label>
                <select value={environment} onChange={(e) => setEnvironment(e.target.value)}>
                    <option value="Development">Development</option>
                    <option value="Staging">Staging</option>
                    <option value="Production">Production</option>
                </select>

                <input
                    type="text"
                    placeholder="Screenshot URL (Optional)"
                    value={screenshot}
                    onChange={(e) => setScreenshot(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Reported By (Your Name)"
                    value={reporter}
                    onChange={(e) => setReporter(e.target.value)}
                    required
                />

                <button type="submit">Report Bug</button>
            </form>

            {/* Popup Notification */}
            {showPopup && (
                <div className="popup">
                    Bug reported successfully! ✅
                </div>
            )}
        </div>
    );
};

export default BugForm;
