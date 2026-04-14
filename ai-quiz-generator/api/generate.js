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
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.ANTHROPIC_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free", // 100% FREE MODEL 🔥
        messages: [{ role: "user", content: prompt }]
      })
    });
    
    const data = await response.json();
    
    // Agar api key ya balance ka koi error hoga toh hume ab pata chal jayega
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    let text = data.choices[0].message.content;
    
    // Extra text hatane ka jugaad
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const questions = JSON.parse(text);
    res.status(200).json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to generate quiz" });
  }
}
