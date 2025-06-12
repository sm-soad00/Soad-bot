// pages/api/song.js
import axios from 'axios';

export default async function handler(req, res) {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing song query" });

  try {
    const response = await axios.get(`https://api.popcat.xyz/songsearch?q=${encodeURIComponent(query)}`);
    res.status(200).json({ result: response.data.result });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch song data" });
  }
}
