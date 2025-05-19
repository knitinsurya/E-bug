import { useState } from "react";
import "./FolderUpload.css";

const FolderUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle folder selection
  const handleFolderChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) {
      setMessage("⚠️ No files selected. Please choose a folder.");
      return;
    }
    setFiles(selectedFiles);
    setMessage(`📂 ${selectedFiles.length} files selected.`);
  };

  // ✅ Upload the entire folder to the backend
  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("⚠️ No folder selected.");
      return;
    }

    setUploading(true);
    setMessage("Uploading folder...");

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file, file.webkitRelativePath); // Preserve folder structure
    });

    try {
      const response = await fetch("http://localhost:5000/upload-folder", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        setMessage(`✅ Folder uploaded successfully! ${data.filesUploaded} files processed.`);
      } else {
        setMessage(`❌ Upload failed: ${data.error || "Unknown error occurred"}`);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage(`❌ Error: ${error.message}`);
    }

    setUploading(false);
  };

  return (
    <div className="folder-upload-container">
      <input 
        type="file" 
        webkitdirectory="true" 
        directory="true" 
        multiple 
        onChange={handleFolderChange} 
        className="file-input" 
        disabled={uploading} 
      />
      
      {files.length > 0 && (
        <div className="file-list">
          <p>📂 {files.length} files selected:</p>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.webkitRelativePath}</li>
            ))}
          </ul>
        </div>
      )}
      
      <button 
        onClick={handleUpload} 
        disabled={uploading || files.length === 0} 
        className="upload-btn"
      >
        {uploading ? "Uploading..." : "Upload Folder"}
      </button>

      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default FolderUpload;
