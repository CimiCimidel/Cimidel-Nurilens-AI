require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({ status: "NutriLens AI backend running 🚀" });
});

app.post("/analyze", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        error: "Missing image",
      });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
Analyze the food in this image.

Return ONLY valid JSON in this exact format:

{
  "food": "",
  "calories": 0,
  "protein": 0,
  "carbs": 0,
  "fat": 0
}

Do not include markdown.
Do not include \`\`\`.
Do not write explanations.
`,
            },
            {
              type: "input_image",
              image_url: `data:image/jpeg;base64,${image}`,
            },
          ],
        },
      ],
    });

    let result = response.output_text.trim();

    result = result.replace(/^```json\s*/i, "");
    result = result.replace(/^```\s*/i, "");
    result = result.replace(/\s*```$/i, "");

    try {
      result = JSON.parse(result);
    } catch (e) {
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: response.output_text,
      });
    }

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 NutriLens AI backend running on port 3000");
});