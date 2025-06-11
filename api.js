const axios = require("axios");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { text, imageUrl } = req.body;

  const config = imageUrl
    ? { modelType: 'text_and_image', prompt: text, imageParts: [imageUrl] }
    : { modelType: 'text_only', prompt: text };

  try {
    const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json");
    const gemini = apis.data.gemini;
    const { data } = await axios.post(`${gemini}/chat-with-gemini`, config);
    return res.json({ result: data.result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Gemini API error." });
  }
}
