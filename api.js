const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  const { prompt, image } = req.body;

  const config = image
    ? { modelType: "text_and_image", prompt, imageParts: [image] }
    : { modelType: "text_only", prompt };

  try {
    const response = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
    const geminiAPI = response.data.gemini;
    const reply = await axios.post(`${geminiAPI}/chat-with-gemini`, config);
    res.json({ result: reply.data.result });
  } catch (error) {
    res.status(500).json({ error: 'Gemini API failed' });
  }
});

module.exports = app;
