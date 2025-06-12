// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [mode, setMode] = useState('gemini');
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [songs, setSongs] = useState([]);

  async function handleClick() {
    if (!text) return;
    setOutput('Loading...');
    setSongs([]);

    if (mode === 'gemini') {
      // Gemini chat
      try {
        const res = await fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: text })
        });
        const data = await res.json();
        setOutput(data.result || data.error);
      } catch {
        setOutput('Gemini request failed.');
      }
    } else {
      // Song search
      try {
        const res = await fetch(`/api/song?q=${encodeURIComponent(text)}`);
        const data = await res.json();
        if (data.error) {
          setOutput(data.error);
        } else if (!data.result || data.result.length === 0) {
          setOutput('No songs found.');
        } else {
          setOutput('');
          setSongs(data.result);
        }
      } catch {
        setOutput('Song search failed.');
      }
    }
  }

  return (
    <div style={{
      background: '#000',
      color: '#0f0',
      minHeight: '100vh',
      fontFamily: 'monospace',
      padding: 20
    }}>
      <h1>💻 Soad Gemini + 🎵 Song Bot</h1>
      <select value={mode} onChange={e => setMode(e.target.value)}>
        <option value="gemini">Gemini</option>
        <option value="song">Song</option>
      </select>
      <br /><br />
      <input
        style={{ width: 300, padding: 8, fontSize: 14 }}
        value={text}
        placeholder={mode === 'gemini' ? "Type your question..." : "Enter song name..."}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={handleClick} style={{ marginLeft: 10, padding: '8px 16px' }}>Send</button>

      <div style={{ marginTop: 20 }}>
        {output && <pre style={{ color: '#0f0' }}>{output}</pre>}
        {songs.length > 0 && songs.map((s, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <strong>{s.title}</strong> — {s.artist}<br/>
            <audio controls src={s.preview} style={{ marginTop: 10, width: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
          }
