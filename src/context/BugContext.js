import { createContext, useEffect, useState } from "react";
import { db } from "../firebase"; // Firestore instance
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

// Create Context
export const BugContext = createContext();

export const BugProvider = ({ children }) => {
    const [bugs, setBugs] = useState([]);

    // Fetch bugs from Firestore
    const fetchBugs = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "bugs"));
            const bugList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBugs(bugList);
        } catch (error) {
            console.error("Error fetching bugs:", error);
        }
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    // Function to delete a bug
    const deleteBug = async (bugId) => {
        try {
            await deleteDoc(doc(db, "bugs", bugId));
            setBugs((prevBugs) => prevBugs.filter((bug) => bug.id !== bugId)); // Update state after deletion
            console.log("Bug deleted successfully.");
        } catch (error) {
            console.error("Error deleting bug:", error);
        }
    };

    // Function to update bug status
    const updateBugStatus = async (bugId, newStatus) => {
        try {
            const bugRef = doc(db, "bugs", bugId);
            await updateDoc(bugRef, { status: newStatus });

            setBugs((prevBugs) =>
                prevBugs.map((bug) =>
                    bug.id === bugId ? { ...bug, status: newStatus } : bug
                )
            );
            console.log("Bug status updated.");
        } catch (error) {
            console.error("Error updating bug status:", error);
        }
    };

    return (
        <BugContext.Provider value={{ bugs, fetchBugs, deleteBug, updateBugStatus }}>
            {children}
        </BugContext.Provider>
    );
};
