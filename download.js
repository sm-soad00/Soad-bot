// pages/api/download.js
import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "No video URL provided." });
  }

  try {
    const api = `https://api.vevioz.com/api/button/${detectPlatform(url)}?url=${encodeURIComponent(url)}`;
    const response = await axios.get(api);
    
    // এখানে response.data থেকে ডাউনলোড লিংক parse করতে হবে — অনেক API HTML রিটার্ন করে
    // আপাতত আমরা একটা ফেইক লিংক রিটার্ন করব (রিয়েল API লাগলে বলবেন)

    return res.json({
      success: true,
      downloadUrl: "https://example.com/sample-video.mp4",
      title: "Sample Video"
    });
  } catch (err) {
    return res.status(500).json({ error: "Download API failed." });
  }
}

function detectPlatform(url) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("facebook.com")) return "facebook";
  if (url.includes("tiktok.com")) return "tiktok";
  if (url.includes("instagram.com")) return "instagram";
  return "unknown";
}
