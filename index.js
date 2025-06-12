// pages/index.js
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("gemini");
  const [output, setOutput] = useState("Waiting...");

  const handleSend = async () => {
    setOutput("Loading...");
    try {
      if (mode === "gemini") {
        const res = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: input })
        });
        const data = await res.json();
        setOutput(data.result || "No response");
      } else {
        const res = await fetch(`/api/download?url=${encodeURIComponent(input)}`);
        const data = await res.json();
        if (data.downloadUrl) {
          setOutput(`🎥 ${data.title}\n🔗 ${data.downloadUrl}`);
        } else {
          setOutput("Download failed.");
        }
      }
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <main style={styles.container}>
      <h1>SOAD Gemini + Video Downloader</h1>
      <select value={mode} onChange={(e) => setMode(e.target.value)} style={styles.input}>
        <option value="gemini">Gemini</option>
        <option value="video">Video Downloader</option>
      </select>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === "gemini" ? "Ask Gemini..." : "Paste Video URL"}
        style={styles.input}
      />
      <button onClick={handleSend} style={styles.button}>Send</button>
      <pre style={styles.output}>{output}</pre>
    </main>
  );
}

const styles = {
  container: {
    fontFamily: "'Share Tech Mono', monospace",
    backgroundColor: "#0d0d0d",
    color: "#33ff33",
    minHeight: "100vh",
    padding: "2rem",
    textAlign: "center"
  },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#33ff33",
    border: "1px solid #33ff33",
    padding: "10px",
    width: "80%",
    maxWidth: "500px",
    marginBottom: "10px",
    fontSize: "1rem"
  },
  button: {
    backgroundColor: "#33ff33",
    color: "#000",
    border: "none",
    padding: "10px 20px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer"
  },
  output: {
    backgroundColor: "#1a1a1a",
    padding: "20px",
    marginTop: "20px",
    border: "1px solid #33ff33",
    maxWidth: "600px",
    margin: "auto"
  }
};
