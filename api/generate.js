import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });
    
    const text = message.content[0].text;
    const questions = JSON.parse(text);
    
    res.status(200).json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
}
