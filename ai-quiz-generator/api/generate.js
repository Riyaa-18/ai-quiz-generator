export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    const { topic, numQ } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [{ 
          role: "user", 
          content: `Generate a JSON array of ${numQ} math MCQs about ${topic}. Format: [{"question": "...", "options": ["...", "..."], "answer": "..."}]` 
        }]
      })
    });

    // Check if response is okay
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error("AI ne koi answer nahi diya. Please try again.");
    }

    let text = data.choices[0].message.content;
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');
    
    if (startIndex === -1 || endIndex === -1) {
      throw new Error("AI response format galat hai.");
    }

    const questions = JSON.parse(text.substring(startIndex, endIndex + 1));
    res.status(200).json({ questions });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
