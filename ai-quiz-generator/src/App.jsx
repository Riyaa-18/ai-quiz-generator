import { useState } from "react";
import axios from "axios";

export default function App() {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("Grade 5");
  const [numQ, setNumQ] = useState(5);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) return alert("Topic enter karo!");
    setLoading(true);
    setQuiz(null);
    setResult(null);
    setAnswers({});
    try {
      const res = await axios.post("/api/generate", { topic, grade, numQ });
      setQuiz(res.data.questions);
    } catch (e) {
      alert("Error generating quiz. Check API key.");
    }
    setLoading(false);
  };

  const submitQuiz = () => {
    let score = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });
    setResult({ score, total: quiz.length });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-purple-700 mb-1">
            AI Math Quiz Generator
          </h1>
          <p className="text-gray-500 text-sm">Powered by Claude AI · Built for Cuemath</p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
              placeholder="e.g. Fractions, Algebra, Geometry..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                {["Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8"].map(g => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Questions: {numQ}
              </label>
              <input
                type="range" min="3" max="10" value={numQ}
                className="w-full mt-2"
                onChange={(e) => setNumQ(Number(e.target.value))}
              />
            </div>
          </div>
          <button
            onClick={generateQuiz}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Generating Quiz..." : "Generate Quiz with AI"}
          </button>
        </div>

        {/* Quiz Section */}
        {quiz && !result && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="font-semibold text-gray-800 mb-4">
              {topic} — {grade}
            </h2>
            {quiz.map((q, i) => (
              <div key={i} className="mb-6">
                <p className="text-sm font-medium text-gray-800 mb-2">
                  Q{i + 1}. {q.question}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswers({ ...answers, [i]: opt })}
                      className={`text-sm px-4 py-2 rounded-lg border transition-colors text-left ${
                        answers[i] === opt
                          ? "bg-purple-100 border-purple-400 text-purple-700 font-medium"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={submitQuiz}
              disabled={Object.keys(answers).length < quiz.length}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              Submit Quiz
            </button>
          </div>
        )}

        {/* Result Section */}
        {result && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-purple-700 mb-1">
                {result.score}/{result.total}
              </p>
              <p className="text-gray-500 text-sm">
                {Math.round((result.score / result.total) * 100)}% correct
              </p>
            </div>
            {quiz.map((q, i) => (
              <div key={i} className="mb-4 p-3 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-700 mb-1">Q{i+1}. {q.question}</p>
                <p className={`text-sm font-medium ${answers[i] === q.answer ? "text-green-600" : "text-red-500"}`}>
                  Your answer: {answers[i] || "—"} {answers[i] === q.answer ? "✓" : "✗"}
                </p>
                {answers[i] !== q.answer && (
                  <p className="text-sm text-green-600">Correct: {q.answer}</p>
                )}
              </div>
            ))}
            <button
              onClick={() => { setQuiz(null); setResult(null); setTopic(""); }}
              className="w-full mt-4 border border-purple-300 text-purple-600 font-medium py-2.5 rounded-lg hover:bg-purple-50"
            >
              Generate New Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}