export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY; // Vercel Settings mein jo key hai
    const { topic, numQ } = req.body;

    const prompt = `You are a math teacher. Generate exactly ${numQ} multiple choice questions about "${topic}".
    IMPORTANT: Return ONLY a valid JSON array. Do not add any conversational text, no markdown, no formatting.
    Format exactly like this:
    [
      {"question": "What is 2+2?", "options": ["1", "2", "3", "4"], "answer": "4"}
    ]`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(`OpenRouter Error: ${data.error.message}`);
    }

    let text = data.choices[0].message.content;

    // JSON ko extract karne ka smart tareeka
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');
    if (startIndex === -1 || endIndex === -1) {
      throw new Error("AI response format error");
    }

    const cleanJson = text.substring(startIndex, endIndex + 1);
    const questions = JSON.parse(cleanJson);

    res.status(200).json({ questions });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
