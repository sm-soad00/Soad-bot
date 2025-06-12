// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await fetch(`/api/song?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setResult([]);
      } else {
        setResult(data.result);
        setError('');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div style={{ padding: 30, backgroundColor: "#000", color: "#0f0", fontFamily: "monospace", minHeight: "100vh" }}>
      <h1>🎵 Soad Gemini + Song Bot</h1>
      <input
        type="text"
        placeholder="Type a song name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 10, width: "300px", fontSize: "16px" }}
      />
      <button onClick={handleSearch} style={{ padding: 10, marginLeft: 10, backgroundColor: "#0f0", color: "#000" }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {result.map((song, index) => (
          <li key={index} style={{ marginTop: 15 }}>
            <strong>{song.name}</strong> by {song.artist} <br />
            Album: {song.album}<br />
            <audio controls src={song.preview}></audio>
          </li>
        ))}
      </ul>
    </div>
  );
}
