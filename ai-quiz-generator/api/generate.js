export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    // Variable ka naam change kiya
    const apiKey = process.env.OPENROUTER_API_KEY; 
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
          content: `Return only a JSON array of ${numQ} math MCQs about ${topic}. Format: [{"question": "...", "options": ["...", "..."], "answer": "..."}]` 
        }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    let text = data.choices[0].message.content;
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');
    
    const questions = JSON.parse(text.substring(startIndex, endIndex + 1));
    res.status(200).json({ questions });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
