export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    // 1. Vercel mein API key check karna
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("Vercel mein API key nahi mili!");
    }

    const { topic, grade, numQ } = req.body;

    const prompt = `You are a math teacher. Generate exactly ${numQ} multiple choice questions about "${topic}" for ${grade} students.
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

    // 2. OpenRouter ki taraf se koi error aaye toh
    if (data.error) {
      throw new Error(`OpenRouter Error: ${data.error.message}`);
    }

    let text = data.choices[0].message.content;

    // 3. SMART FILTER: AI ki faltu baatein hatakar sirf Bracket [...] ke andar ka data nikalna
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');

    if (startIndex === -1 || endIndex === -1) {
      throw new Error("AI ne sahi format mein answer nahi diya.");
    }

    const cleanJson = text.substring(startIndex, endIndex + 1);
    const questions = JSON.parse(cleanJson);

    res.status(200).json({ questions });

  } catch (err) {
    console.error("Backend Crash:", err);
    res.status(500).json({ error: err.message });
  }
}
