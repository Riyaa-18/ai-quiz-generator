export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  
  const { topic, grade, numQ } = req.body;
  
  const prompt = `You are a math teacher creating a quiz for ${grade} students.
Generate exactly ${numQ} multiple choice questions about "${topic}".
Respond ONLY with a valid JSON array, no extra text, no markdown, like this:
[
  {
    "question": "What is 3/4 + 1/4?",
    "options": ["1/2", "1", "3/8", "2/4"],
    "answer": "1"
  }
]
Rules:
- Each question must have exactly 4 options
- The answer must be one of the 4 options exactly
- Questions must be appropriate for ${grade}
- Topic is: ${topic}`;

  try {
    // OpenRouter se direct baat karne ka code
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.ANTHROPIC_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet", // OpenRouter ke through Claude
        messages: [{ role: "user", content: prompt }]
      })
    });
    
    const data = await response.json();
    let text = data.choices[0].message.content;
    
    // Agar AI extra format laga de, toh use saaf karna
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const questions = JSON.parse(text);
    res.status(200).json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
}