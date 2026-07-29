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
              text:
                "Identify the food in this image. Return ONLY valid JSON with: food, calories, protein, carbs, fat.",
            },
            {
              type: "input_image",
              image_url: image,
            },
          ],
        },
      ],
    });

    res.json({
      result: response.output_text,
    });
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
