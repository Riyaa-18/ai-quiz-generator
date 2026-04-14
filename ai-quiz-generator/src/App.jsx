import { useState } from 'react';
import './App.css';

// Humara Secret "Fake AI" Database
const questionDatabase = {
  "algebra": [
    { question: "Solve for x: 2x + 5 = 15", options: ["5", "10", "15", "20"], answer: "5" },
    { question: "What is the value of y if y - 7 = 12?", options: ["5", "19", "12", "7"], answer: "19" },
    { question: "Simplify: 3x + 2x - x", options: ["3x", "4x", "5x", "6x"], answer: "4x" },
    { question: "If 4a = 20, what is a?", options: ["4", "5", "16", "24"], answer: "5" },
    { question: "Expand: 2(x + 3)", options: ["2x+3", "2x+6", "x+6", "2x+5"], answer: "2x+6" },
    { question: "Solve for z: z/2 = 8", options: ["4", "16", "10", "12"], answer: "16" },
    { question: "Evaluate 3p + 2 when p = 4", options: ["14", "12", "9", "24"], answer: "14" },
    { question: "Simplify: 5y - y + 2y", options: ["4y", "5y", "6y", "7y"], answer: "6y" },
    { question: "Solve: 10 - x = 3", options: ["7", "13", "30", "-7"], answer: "7" },
    { question: "Factorize: 4x + 8", options: ["4(x+2)", "2(x+4)", "4x+2", "4(x+8)"], answer: "4(x+2)" }
  ],
  "fractions": [
    { question: "What is 1/2 + 1/4?", options: ["2/6", "3/4", "1/8", "2/4"], answer: "3/4" },
    { question: "Simplify 4/8", options: ["1/4", "1/2", "2/3", "3/4"], answer: "1/2" },
    { question: "What is 3/4 - 1/4?", options: ["2/4", "1", "1/4", "4/4"], answer: "2/4" },
    { question: "Multiply: 1/2 * 1/2", options: ["1", "1/4", "2/4", "1/2"], answer: "1/4" },
    { question: "Which is larger: 1/2 or 1/3?", options: ["1/2", "1/3", "Equal", "Cannot tell"], answer: "1/2" },
    { question: "Convert 50% to a fraction.", options: ["1/4", "1/2", "1/5", "3/4"], answer: "1/2" },
    { question: "1/3 + 1/3 = ?", options: ["2/3", "1/6", "2/6", "1"], answer: "2/3" },
    { question: "What is 1/4 of 20?", options: ["5", "4", "10", "2"], answer: "5" },
    { question: "Equivalent fraction for 2/6 is?", options: ["1/2", "1/3", "2/3", "1/4"], answer: "1/3" },
    { question: "If you eat 5 slices of an 8-slice pizza, what fraction is left?", options: ["3/8", "5/8", "1/8", "8/8"], answer: "3/8" }
  ],
  "data handling": [
    { question: "What is the mean of 2, 4, 6?", options: ["4", "12", "6", "2"], answer: "4" },
    { question: "The middle value of an ordered dataset is called?", options: ["Mean", "Mode", "Median", "Range"], answer: "Median" },
    { question: "The value that appears most often is?", options: ["Mean", "Mode", "Median", "Range"], answer: "Mode" },
    { question: "Difference between highest and lowest value is?", options: ["Mean", "Mode", "Median", "Range"], answer: "Range" },
    { question: "What is the mode of 1, 2, 2, 3?", options: ["1", "2", "3", "None"], answer: "2" },
    { question: "A chart that uses rectangular blocks is called a?", options: ["Pie Chart", "Bar Graph", "Line Graph", "Tally"], answer: "Bar Graph" },
    { question: "A graph using pictures is called a?", options: ["Pictograph", "Bar Graph", "Pie Chart", "Line Graph"], answer: "Pictograph" },
    { question: "Find the median of: 1, 3, 5", options: ["1", "3", "5", "4"], answer: "3" },
    { question: "Find the range: 10, 20, 30, 40", options: ["10", "20", "30", "40"], answer: "30" },
    { question: "Tally marks are usually grouped in sets of?", options: ["2", "4", "5", "10"], answer: "5" }
  ],
  "measurements": [
    { question: "How many meters are in 1 kilometer?", options: ["10", "100", "1000", "10000"], answer: "1000" },
    { question: "How many grams in 2.5 kg?", options: ["250g", "2500g", "25g", "2005g"], answer: "2500g" },
    { question: "What is the area of a 5cm by 4cm rectangle?", options: ["9 sq cm", "18 sq cm", "20 sq cm", "40 sq cm"], answer: "20 sq cm" },
    { question: "Perimeter of a square with side length 3cm?", options: ["9cm", "6cm", "12cm", "15cm"], answer: "12cm" },
    { question: "Convert 120 minutes to hours.", options: ["1 hour", "1.5 hours", "2 hours", "3 hours"], answer: "2 hours" },
    { question: "How many milliliters in 1 liter?", options: ["100", "500", "1000", "10000"], answer: "1000" },
    { question: "Volume of a cube with side 2cm?", options: ["4 cubic cm", "6 cubic cm", "8 cubic cm", "12 cubic cm"], answer: "8 cubic cm" },
    { question: "500 cm is equal to how many meters?", options: ["0.5m", "5m", "50m", "5000m"], answer: "5m" },
    { question: "Which unit is best to measure the distance between two cities?", options: ["Meters", "Centimeters", "Kilometers", "Millimeters"], answer: "Kilometers" },
    { question: "How many seconds are in 1 hour?", options: ["60", "360", "3600", "100"], answer: "3600" }
  ],
  "trigonometry": [
    { question: "What is sin(90°)?", options: ["0", "1", "-1", "undefined"], answer: "1" },
    { question: "What is cos(0°)?", options: ["0", "1", "-1", "undefined"], answer: "1" },
    { question: "What is tan(45°)?", options: ["0", "1", "-1", "undefined"], answer: "1" },
    { question: "Sine is the ratio of Opposite to...?", options: ["Adjacent", "Hypotenuse", "Base", "Angle"], answer: "Hypotenuse" },
    { question: "What is sin²θ + cos²θ?", options: ["0", "1", "tanθ", "-1"], answer: "1" },
    { question: "Cosine is the ratio of Adjacent to...?", options: ["Opposite", "Hypotenuse", "Height", "Base"], answer: "Hypotenuse" },
    { question: "What is the reciprocal of Sine?", options: ["Cosine", "Tangent", "Secant", "Cosecant"], answer: "Cosecant" },
    { question: "tan(θ) is equal to?", options: ["sin/cos", "cos/sin", "1/sin", "1/cos"], answer: "sin/cos" },
    { question: "What is sin(30°)?", options: ["1", "1/2", "0", "√3/2"], answer: "1/2" },
    { question: "In a right triangle, what is the longest side called?", options: ["Base", "Perpendicular", "Hypotenuse", "Adjacent"], answer: "Hypotenuse" }
  ]
};

export default function App() {
  const [topicInput, setTopicInput] = useState("");
  const [numQ, setNumQ] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const generateQuiz = () => {
    // Basic validation
    if (!topicInput.trim()) {
      setErrorMsg("Please type a topic first!");
      return;
    }

    setLoading(true);
    setScore(null);
    setUserAnswers({});
    setErrorMsg("");
    setQuestions([]);
    
    // Fake AI Delay (1.5 seconds)
    setTimeout(() => {
      // Input ko lowercase karke check karna taaki spelling case ka issue na ho
      const searchTopic = topicInput.toLowerCase().trim();
      
      if (questionDatabase[searchTopic]) {
        // Agar topic mil gaya
        const selectedQuestions = questionDatabase[searchTopic].slice(0, numQ);
        setQuestions(selectedQuestions);
      } else {
        // Fake AI Error agar topic database mein nahi hai
        setErrorMsg("AI Model Error: Topic not found in current training dataset. Try: Algebra, Fractions, Data Handling, Measurements, or Trigonometry.");
      }
      setLoading(false);
    }, 1500);
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
        
        {/* Header */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            AI Math Quiz Generator
          </h1>
          <p className="text-lg text-gray-400">Powered by Custom AI Models</p>
        </div>
        
        {/* Input Form */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)] mb-8 border border-gray-700">
          <div className="flex flex-col gap-6 mb-8">
            
            {/* Text Input for Topic */}
            <div>
              <label className="block text-base font-medium text-gray-300 mb-2">
                What topic do you want to learn?
              </label>
              <input 
                type="text" 
                placeholder="e.g. Algebra, Fractions, Trigonometry..."
                value={topicInput} 
                onChange={(e) => setTopicInput(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 focus:border-blue-500 text-white p-4 rounded-xl outline-none transition-colors text-lg"
              />
            </div>
            
            {/* Slider */}
            <div>
              <label className="block text-base font-medium text-gray-300 mb-3 flex justify-between">
                <span>Number of AI Questions</span>
                <span className="font-bold text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">{numQ}</span>
              </label>
              <input 
                type="range" min="1" max="10" 
                value={numQ} onChange={(e) => setNumQ(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
          
          <button 
            onClick={generateQuiz} 
            disabled={loading}
            className={`w-full font-bold py-4 px-4 rounded-xl text-lg transition-all transform hover:scale-[1.02] ${
              loading 
                ? 'bg-blue-800 text-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30'
            }`}
          >
            {loading ? "🤖 AI is generating your quiz..." : "✨ Generate Quiz with AI"}
          </button>

          {/* Error Message Display */}
          {errorMsg && (
            <div className="mt-6 p-4 bg-red-900/40 border border-red-500/50 rounded-xl text-red-200 text-center">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Quiz Display Area */}
        {questions.length > 0 && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
            {questions.map((q, index) => (
              <div key={index} className="mb-10 pb-8 border-b border-gray-700 last:border-0 last:mb-0 last:pb-0">
                <h3 className="text-2xl mb-6 font-medium leading-relaxed">
                  <span className="text-blue-400 font-bold mr-2">Q{index + 1}.</span> 
                  {q.question}
                </h3>
                
                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt, i) => {
                    const isSelected = userAnswers[index] === opt;
                    return (
                      <button
                        key={i}
                        onClick={() => setUserAnswers({...userAnswers, [index]: opt})}
                        className={`p-5 rounded-xl border-2 text-left text-lg font-medium transition-all duration-200 ${
                          isSelected 
                            ? 'bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)] transform scale-[1.02]' 
                            : 'bg-gray-900 border-gray-700 hover:bg-gray-700 hover:border-gray-500'
                        }`}
                      >
                        <span className="inline-block w-8 h-8 rounded-full border-2 border-current text-center leading-7 mr-3 opacity-70">
                          {['A', 'B', 'C', 'D'][i]}
                        </span>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            
            {/* Submit Button & Score Display */}
            {score === null ? (
              <button 
                onClick={submitQuiz}
                className="w-full bg-green-600 hover:bg-green-500 font-bold py-4 rounded-xl mt-8 text-xl shadow-lg shadow-green-500/30 transition-all transform hover:scale-[1.02]"
              >
                Submit & Check Score
              </button>
            ) : (
              <div className="mt-8 p-8 bg-gray-900 rounded-2xl text-center border-2 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <h2 className="text-4xl font-bold text-white mb-3">Quiz Completed! 🎉</h2>
                <p className="text-2xl text-gray-300">
                  Your AI generated score: <span className="text-green-400 font-extrabold text-3xl">{score}</span> / {questions.length}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
