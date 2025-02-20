import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
const API_URL = "https://ai-ar-backend.onrender.com/analyze"; // Your Render backend URL


const CameraFeed = () => {
  const webcamRef = useRef(null);
  const [response, setResponse] = useState("Waiting for AI analysis...");
  const [loading, setLoading] = useState(false);

  const captureAndSend = async () => {
    try {
      setResponse("📸 Capturing image...");
      setLoading(true);

      // ✅ Capture screenshot from webcam
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        setResponse("❌ Error: Unable to capture image.");
        setLoading(false);
        return;
      }

      setResponse("🔄 Processing image...");

      // ✅ Convert to Blob
      const blob = await (await fetch(imageSrc)).blob();
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      // ✅ Send API request
      const res = await axios.post("http://127.0.0.1:8000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ API Response:", res.data);
      setLoading(false);

      // ✅ Handle API response
      if (res.data.error) {
        setResponse(`⚠️ Error: ${res.data.error}`);
      } else {
        setResponse(
          `✅ **Pose:** ${res.data.poses} \n🔆 **Lighting:** ${res.data.lighting}`
        );
      }
    } catch (error) {
      console.error("❌ API Request Failed:", error);
      setResponse("⚠️ Failed to analyze image. Server error.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📷 AI-AR Photography Assistant</h1>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" style={styles.webcam} />
      
      <button onClick={captureAndSend} style={styles.button} disabled={loading}>
        {loading ? "⏳ Analyzing..." : "📸 Capture & Analyze"}
      </button>

      <div style={styles.resultContainer}>
        <h3 style={styles.resultTitle}>AI Suggestions:</h3>
        <pre style={styles.resultBox}>{response}</pre>
      </div>
    </div>
  );
};

// ✅ Styling for better UI
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  title: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "10px",
  },
  webcam: {
    width: "100%",
    maxWidth: "640px",
    borderRadius: "10px",
    border: "3px solid #4CAF50",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "0.3s",
  },
  resultContainer: {
    marginTop: "20px",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "auto",
  },
  resultTitle: {
    color: "#333",
    fontSize: "18px",
  },
  resultBox: {
    backgroundColor: "#f8f8f8",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "14px",
    textAlign: "left",
    whiteSpace: "pre-wrap",
  },
};

export default CameraFeed;
