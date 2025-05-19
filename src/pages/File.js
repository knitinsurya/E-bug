import { useState } from "react";
import "./FileUpload.css"; // Your existing styles
import Loader from "./Loader.js";
 // Make sure the path is correct

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ No file selected.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Uploading file:", file.name);

      const response = await fetch("http://localhost:5000/upload-file", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        setMessage(`✅ File uploaded successfully! Bug Found: ${data.bugFound}`);
      } else {
        setMessage(`❌ Upload failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage(`❌ Error: ${error.message}`);
    }

    setUploading(false);
  };

  return (
    <div className="file-upload-container">
      <h2>Bug Tracker - File Upload</h2>

      {uploading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
          <Loader />
        </div>
      ) : (
        <>
          <input type="file" onChange={handleFileChange} className="file-input" disabled={uploading} />

          {preview && (
            <div className="file-preview">
              <img src={preview} alt="Preview" className="preview-image" />
            </div>
          )}

          <button onClick={handleUpload} disabled={uploading || !file} className="upload-btn">
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {message && <p className="upload-message">{message}</p>}
        </>
      )}

      {/* Bug Information Section */}
      <div className="bug-info-container">
        <h3>Types of Bugs in Bug Tracking</h3>

        <div className="bug-category">
          <h4>1. Functional Bugs</h4>
          <p>These bugs occur when a specific software component does not function as expected.</p>
          <p><b>Example: A login button that does not work.</b></p>
        </div>

        <div className="bug-category">
          <h4>2. Logical Bugs</h4>
          <p>These bugs occur due to incorrect logic in the code.</p>
          <p><b>Example: Assigning a value to the wrong variable or incorrect calculations.</b></p>
        </div>

        <div className="bug-category">
          <h4>3. Workflow Bugs</h4>
          <p>These bugs affect the user journey or navigation flow of an application.</p>
          <p><b>Example: Clicking "Save and Exit" exits without saving.</b></p>
        </div>

        <div className="bug-category">
          <h4>4. Unit Level Bugs</h4>
          <p>These occur in small, isolated components of a program.</p>
          <p><b>Example: A form field not accepting valid input.</b></p>
        </div>

        <div className="bug-category">
          <h4>5. System-Level Integration Bugs</h4>
          <p>These occur when multiple components fail to work together.</p>
          <p><b>Example: A booking system failing due to third-party service issues.</b></p>
        </div>

        <div className="bug-category">
          <h4>6. Out of Bound Bugs</h4>
          <p>These occur when unexpected inputs break the system.</p>
          <p><b>Example: Entering extremely large numbers in an input field.</b></p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
