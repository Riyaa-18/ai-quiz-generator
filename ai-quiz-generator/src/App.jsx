import { useState } from 'react';
import './App.css';

export default function App() {
  const [topicInput, setTopicInput] = useState("");
  const [numQ, setNumQ] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const generateQuiz = async () => {
    if (!topicInput.trim()) {
      setErrorMsg("Please type a topic first!");
      return;
    }

    setLoading(true);
    setScore(null);
    setUserAnswers({});
    setErrorMsg("");
    setQuestions([]);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicInput, numQ: numQ })
      });

      const data = await response.json();

      if (response.ok && data.questions) {
        setQuestions(data.questions);
      } else {
        throw new Error(data.error || "AI failed to generate quiz");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = () => {
    let currentScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) currentScore++;
    });
    setScore(currentScore);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 mt-8">
          <h1 className="text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            AI Math Quiz Generator
          </h1>
          <p className="text-lg text-gray-400">Powered by Custom AI Models</p>
        </div>
        
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg mb-8 border border-gray-700">
          <div className="flex flex-col gap-6 mb-8">
            <div>
              <label className="block text-base font-medium text-gray-300 mb-2">What topic do you want to learn?</label>
              <input 
                type="text" placeholder="e.g. Algebra, Calculus..."
                value={topicInput} onChange={(e) => setTopicInput(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 p-4 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-300 mb-3 flex justify-between">
                <span>Number of AI Questions</span>
                <span className="font-bold text-blue-400">{numQ}</span>
              </label>
              <input 
                type="range" min="1" max="10" 
                value={numQ} onChange={(e) => setNumQ(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
          <button 
            onClick={generateQuiz} disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 font-bold py-4 rounded-xl text-lg hover:opacity-90 transition-all"
          >
            {loading ? "🤖 AI is generating your quiz..." : "✨ Generate Quiz with AI"}
          </button>
          {errorMsg && <div className="mt-6 p-4 bg-red-900/40 border border-red-500 rounded-xl text-red-200 text-center">{errorMsg}</div>}
        </div>

        {questions.length > 0 && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
            {questions.map((q, index) => (
              <div key={index} className="mb-10 pb-8 border-b border-gray-700 last:border-0 last:mb-0 last:pb-0">
                <h3 className="text-2xl mb-6 font-medium leading-relaxed">Q{index + 1}. {q.question}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setUserAnswers({...userAnswers, [index]: opt})}
                      className={`p-5 rounded-xl border-2 text-left text-lg font-medium transition-all ${
                        userAnswers[index] === opt ? 'bg-blue-600 border-blue-400' : 'bg-gray-900 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      <span className="mr-3 opacity-70">{['A', 'B', 'C', 'D'][i]}.</span> {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {score === null ? (
              <button onClick={submitQuiz} className="w-full bg-green-600 font-bold py-4 rounded-xl mt-8 text-xl shadow-lg transition-all">Submit Quiz</button>
            ) : (
              <div className="mt-8 p-8 bg-gray-900 rounded-2xl text-center border-2 border-green-500">
                <h2 className="text-4xl font-bold mb-3 text-white">Quiz Completed! 🎉</h2>
                <p className="text-2xl">Your Score: <span className="text-green-400 font-extrabold">{score}</span> / {questions.length}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
