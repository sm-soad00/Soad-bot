// api/song.js
const axios = require("axios");

export default async function handler(req, res) {
  const q = req.method === "GET" ? req.query.q : req.body.q;
  if (!q) return res.status(400).json({ error: "Please provide a song query" });

  try {
    const response = await axios.get(`https://api.popcat.xyz/songsearch?q=${encodeURIComponent(q)}`);
    const result = response.data.result;
    return res.json({ result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Song search failed" });
  }
}
