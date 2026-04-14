import { useState } from 'react';
import './App.css';

const questionDatabase = {
  "algebra": [
    { question: "Solve for x: 2x + 5 = 15", options: ["5", "10", "15", "20"], answer: "5" },
    { question: "If y - 7 = 12, what is y?", options: ["19", "5", "12", "7"], answer: "19" },
    { question: "Simplify: 3x + 2x - x", options: ["3x", "4x", "5x", "6x"], answer: "4x" },
    { question: "If 4a = 20, what is a?", options: ["4", "5", "16", "24"], answer: "5" },
    { question: "Expand: 2(x + 3)", options: ["2x+6", "2x+3", "x+6", "2x+5"], answer: "2x+6" },
    { question: "Solve for z: z/2 = 8", options: ["16", "4", "10", "12"], answer: "16" },
    { question: "Evaluate 3p + 2 when p = 4", options: ["14", "12", "9", "24"], answer: "14" },
    { question: "Simplify: 5y - y + 2y", options: ["6y", "4y", "3y", "2y"], answer: "6y" },
    { question: "Solve: 10 - x = 3", options: ["7", "13", "30", "-7"], answer: "7" },
    { question: "Factorize: 4x + 8", options: ["4(x+2)", "2(x+4)", "4x+2", "4(x+8)"], answer: "4(x+2)" }
  ],
  "calculus": [
    { question: "What is the derivative of x²?", options: ["2x", "x", "2", "x²"], answer: "2x" },
    { question: "Find d/dx of sin(x)", options: ["cos(x)", "-cos(x)", "sin(x)", "tan(x)"], answer: "cos(x)" },
    { question: "The integral of 1 dx is?", options: ["x", "0", "1", "x²"], answer: "x" },
    { question: "What is d/dx of a constant?", options: ["0", "1", "constant", "undefined"], answer: "0" },
    { question: "Derivative of e^x?", options: ["e^x", "xe^x", "1", "log x"], answer: "e^x" },
    { question: "Find d/dx of x³", options: ["3x²", "2x³", "3x", "x²"], answer: "3x²" },
    { question: "Integral of cos(x) dx?", options: ["sin(x)", "-sin(x)", "tan(x)", "cos(x)"], answer: "sin(x)" },
    { question: "The slope of a curve at a point is its?", options: ["Derivative", "Integral", "Limit", "Function"], answer: "Derivative" },
    { question: "Power rule for d/dx (x^n) is?", options: ["nx^(n-1)", "nx^n", "x^(n+1)", "n/x"], answer: "nx^(n-1)" },
    { question: "Find d/dx of log(x)", options: ["1/x", "x", "e^x", "1"], answer: "1/x" }
  ],
  "geometry": [
    { question: "How many sides does a hexagon have?", options: ["6", "5", "7", "8"], answer: "6" },
    { question: "Sum of angles in a triangle?", options: ["180°", "90°", "360°", "270°"], answer: "180°" },
    { question: "A 90-degree angle is called?", options: ["Right", "Acute", "Obtuse", "Straight"], answer: "Right" },
    { question: "Area of a circle formula?", options: ["πr²", "2πr", "bh", "l×w"], answer: "πr²" },
    { question: "Degrees in a circle?", options: ["360", "180", "90", "100"], answer: "360" },
    { question: "Triangle with all sides equal?", options: ["Equilateral", "Isosceles", "Scalene", "Right"], answer: "Equilateral" },
    { question: "A 5-sided polygon is?", options: ["Pentagon", "Hexagon", "Square", "Octagon"], answer: "Pentagon" },
    { question: "Longest side of a right triangle?", options: ["Hypotenuse", "Base", "Height", "Median"], answer: "Hypotenuse" },
    { question: "Angle more than 90 but less than 180?", options: ["Obtuse", "Acute", "Reflex", "Right"], answer: "Obtuse" },
    { question: "Vertices in a cube?", options: ["8", "6", "4", "12"], answer: "8" }
  ],
  "trignometry": [
    { question: "What is sin(90°)?", options: ["1", "0", "-1", "0.5"], answer: "1" },
    { question: "What is tan(45°)?", options: ["1", "0", "√3", "1/√3"], answer: "1" },
    { question: "sin²θ + cos²θ = ?", options: ["1", "0", "tanθ", "secθ"], answer: "1" },
    { question: "Reciprocal of Sine?", options: ["Cosecant", "Secant", "Tangent", "Cosine"], answer: "Cosecant" },
    { question: "What is cos(60°)?", options: ["0.5", "√3/2", "1", "0"], answer: "0.5" },
    { question: "Tan is the ratio of?", options: ["Opp/Adj", "Opp/Hyp", "Adj/Hyp", "Hyp/Opp"], answer: "Opp/Adj" },
    { question: "What is sin(0°)?", options: ["0", "1", "0.5", "undefined"], answer: "0" },
    { question: "sec(θ) is equal to?", options: ["1/cos", "1/sin", "1/tan", "sin/cos"], answer: "1/cos" },
    { question: "What is cos(90°)?", options: ["0", "1", "0.5", "-1"], answer: "0" },
    { question: "What is cot(45°)?", options: ["1", "0", "undefined", "√3"], answer: "1" }
  ],
  "fractions": [
    { question: "1/2 + 1/4 = ?", options: ["3/4", "2/6", "1/8", "2/4"], answer: "3/4" },
    { question: "Simplify 4/8", options: ["1/2", "1/4", "2/3", "3/4"], answer: "1/2" },
    { question: "3/4 - 1/4 = ?", options: ["2/4", "1", "1/4", "4/4"], answer: "2/4" },
    { question: "Multiply: 1/2 * 1/2", options: ["1/4", "1", "2/4", "1/2"], answer: "1/4" },
    { question: "Which is larger: 1/2 or 1/3?", options: ["1/2", "1/3", "Equal", "Cannot tell"], answer: "1/2" },
    { question: "Convert 50% to fraction", options: ["1/2", "1/4", "1/5", "3/4"], answer: "1/2" },
    { question: "1/3 + 1/3 = ?", options: ["2/3", "1/6", "2/6", "1"], answer: "2/3" },
    { question: "1/4 of 20?", options: ["5", "4", "10", "2"], answer: "5" },
    { question: "Equivalent fraction for 2/6?", options: ["1/3", "1/2", "2/3", "1/4"], answer: "1/3" },
    { question: "If you eat 5/8 of a pizza, what is left?", options: ["3/8", "5/8", "1/8", "8/8"], answer: "3/8" }
  ],
  "integers": [
    { question: "-5 + 3 = ?", options: ["-2", "2", "-8", "8"], answer: "-2" },
    { question: "-10 - (-5) = ?", options: ["-5", "-15", "5", "15"], answer: "-5" },
    { question: "(-2) * (-4) = ?", options: ["8", "-8", "-6", "6"], answer: "8" },
    { question: "10 / (-2) = ?", options: ["-5", "5", "12", "-8"], answer: "-5" },
    { question: "-10 or -1, which is smaller?", options: ["-10", "-1", "Equal", "None"], answer: "-10" },
    { question: "Absolute value of -7?", options: ["7", "-7", "0", "1"], answer: "7" },
    { question: "(-3) + (-2) = ?", options: ["-5", "5", "-1", "1"], answer: "-5" },
    { question: "0 is a?", options: ["Neutral int", "Positive int", "Negative int", "None"], answer: "Neutral int" },
    { question: "Integer after -1?", options: ["0", "-2", "1", "-0.1"], answer: "0" },
    { question: "Smallest positive integer?", options: ["1", "0", "2", "-1"], answer: "1" }
  ],
  "decimals": [
    { question: "0.5 + 0.5 = ?", options: ["1.0", "0.10", "0.25", "5.5"], answer: "1.0" },
    { question: "Which is larger: 0.1 or 0.01?", options: ["0.1", "0.01", "Equal", "None"], answer: "0.1" },
    { question: "0.25 as a fraction?", options: ["1/4", "1/2", "1/8", "1/10"], answer: "1/4" },
    { question: "0.1 * 10 = ?", options: ["1", "0.1", "10", "0.01"], answer: "1" },
    { question: "3/10 as a decimal?", options: ["0.3", "0.03", "3.0", "0.33"], answer: "0.3" },
    { question: "5.4 - 2.1 = ?", options: ["3.3", "3.0", "3.1", "3.5"], answer: "3.3" },
    { question: "0.75 as percent?", options: ["75%", "7.5%", "0.75%", "750%"], answer: "75%" },
    { question: "0.8 / 2 = ?", options: ["0.4", "4", "0.04", "0.2"], answer: "0.4" },
    { question: "0.09 + 0.01 = ?", options: ["0.10", "1.0", "0.010", "0.009"], answer: "0.10" },
    { question: "Place value of 5 in 0.52?", options: ["Tenths", "Hundredths", "Ones", "Tens"], answer: "Tenths" }
  ],
  "percentages": [
    { question: "10% of 100?", options: ["10", "1", "5", "20"], answer: "10" },
    { question: "50% of 80?", options: ["40", "20", "60", "10"], answer: "40" },
    { question: "25% as fraction?", options: ["1/4", "1/2", "1/5", "3/4"], answer: "1/4" },
    { question: "100% of 5?", options: ["5", "0", "1", "10"], answer: "5" },
    { question: "Increase 20 by 50%", options: ["30", "25", "40", "10"], answer: "30" },
    { question: "1/5 as a percent?", options: ["20%", "10%", "25%", "50%"], answer: "20%" },
    { question: "75% of 100?", options: ["75", "25", "50", "100"], answer: "75" },
    { question: "5% of 200?", options: ["10", "5", "15", "20"], answer: "10" },
    { question: "4/5 score as %?", options: ["80%", "40%", "90%", "75%"], answer: "80%" },
    { question: "150% as decimal?", options: ["1.5", "15", "0.15", "150"], answer: "1.5" }
  ],
  "probability": [
    { question: "Prob of heads in coin toss?", options: ["0.5", "0", "1", "2"], answer: "0.5" },
    { question: "Sum of all probabilities?", options: ["1", "0", "0.5", "100"], answer: "1" },
    { question: "Rolling a 7 on a 6-sided die?", options: ["0", "1/6", "1", "1/7"], answer: "0" },
    { question: "Odd number on 6-sided die?", options: ["1/2", "1/3", "1/6", "1"], answer: "1/2" },
    { question: "Event that never happens?", options: ["Impossible", "Possible", "Likely", "Certain"], answer: "Impossible" },
    { question: "3 red, 2 blue balls. Prob of blue?", options: ["2/5", "3/5", "2/3", "1/2"], answer: "2/5" },
    { question: "Prob of a certain event?", options: ["1", "0", "0.5", "Infinite"], answer: "1" },
    { question: "Outcome of experiment is?", options: ["Event", "Sample", "Space", "Trial"], answer: "Event" },
    { question: "Prob of 'not E' is?", options: ["1 - E", "E - 1", "0", "1"], answer: "1 - E" },
    { question: "Fair die roll. Prob of 2?", options: ["1/6", "1/2", "2/6", "1"], answer: "1/6" }
  ],
  "measurements": [
    { question: "1 km = ? meters", options: ["1000", "100", "500", "10000"], answer: "1000" },
    { question: "2.5 L = ? ml", options: ["2500", "250", "25000", "25"], answer: "2500" },
    { question: "Standard unit of mass?", options: ["Gram", "Meter", "Liter", "Second"], answer: "Gram" },
    { question: "120 seconds = ? minutes", options: ["2", "1", "3", "0.5"], answer: "2" },
    { question: "Area of 5x6 rectangle?", options: ["30", "11", "22", "60"], answer: "30" },
    { question: "Boiling point of water?", options: ["100°C", "0°C", "50°C", "212°C"], answer: "100°C" },
    { question: "Perimeter of square side 4?", options: ["16", "8", "12", "20"], answer: "16" },
    { question: "cm in 1 meter?", options: ["100", "10", "1000", "10000"], answer: "100" },
    { question: "Volume of cube side 3?", options: ["27", "9", "12", "81"], answer: "27" },
    { question: "1 ton = ? kg", options: ["1000", "100", "500", "2000"], answer: "1000" }
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
    const input = topicInput.trim().toLowerCase();
    if (!input) {
      setErrorMsg("Oops! Type a topic first ✏️");
      return;
    }
    setLoading(true);
    setScore(null);
    setUserAnswers({});
    setErrorMsg("");
    setQuestions([]);
    
    setTimeout(() => {
      if (questionDatabase[input]) {
        setQuestions(questionDatabase[input].slice(0, numQ));
      } else {
        setErrorMsg("AI is busyy");
      }
      setLoading(false);
    }, 1200);
  };

  const submitQuiz = () => {
    let currentScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) currentScore++;
    });
    setScore(currentScore);
  };

  return (
    <div className="math-bg min-h-screen text-white p-6 font-sans relative">
      <div className="max-w-4xl mx-auto py-10 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full font-black text-sm mb-4 transform -rotate-2">
            AI Quiz Generator
          </div>
          <h1 className="text-6xl font-black tracking-tighter mb-4 text-white drop-shadow-md">
            MATH <span className="text-blue-400">HERO</span>
          </h1>
          <p className="text-gray-400 text-lg uppercase tracking-widest">Master the Syllabus with Logic</p>
        </div>
        
        {/* Input Card */}
        <div className="glass-card p-10 rounded-[2.5rem] shadow-2xl mb-16 max-w-2xl mx-auto border border-gray-700/50">
          <div className="space-y-8">
            <div>
              <label className="block text-blue-300 font-bold mb-3 ml-1">📚 Target Mission Topic</label>
              {/* Added Placeholder here as requested */}
              <input 
                type="text" 
                placeholder="like Algebra, Calculus, etc." 
                value={topicInput} 
                onChange={(e) => setTopicInput(e.target.value)}
                className="w-full bg-gray-900/80 border-2 border-gray-700 focus:border-blue-400 text-white p-5 rounded-2xl outline-none transition-all text-xl font-medium"
              />
            </div>
            
            <div>
              <label className="block text-blue-300 font-bold mb-3 ml-1 flex justify-between">
                <span>⚡ no. of Questions: </span>
                <span className="text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-lg">{numQ} Questions</span>
              </label>
              <input 
                type="range" min="1" max="10" 
                value={numQ} onChange={(e) => setNumQ(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
            </div>

            <button 
              onClick={generateQuiz} 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl text-2xl transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] active:scale-95 disabled:opacity-50"
            >
              {loading ? "SCANNING SYLLABUS... 🧠" : "GENERATE AI QUIZ 🚀"}
            </button>
          </div>

          {errorMsg && (
            <div className="mt-8 p-4 bg-red-500/10 border-2 border-red-500/50 text-red-200 rounded-2xl text-center font-bold">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Quiz Items */}
        {questions.length > 0 && (
          <div className="grid gap-10 animate-slide-up">
            {questions.map((q, index) => (
              <div key={index} className="glass-card p-10 rounded-[2.5rem] border-l-8 border-l-blue-500 bg-gray-800/40">
                <h3 className="text-3xl mb-10 font-black leading-tight flex items-start">
                  <span className="bg-blue-500 text-white min-w-[40px] h-[40px] rounded-lg flex items-center justify-center mr-4 text-xl">
                    {index + 1}
                  </span> 
                  {q.question}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {q.options.map((opt, i) => {
                    const isSelected = userAnswers[index] === opt;
                    return (
                      <button
                        key={i}
                        onClick={() => setUserAnswers({...userAnswers, [index]: opt})}
                        className={`p-6 rounded-3xl border-2 text-left text-xl font-bold transition-all duration-200 ${
                          isSelected 
                            ? 'bg-yellow-400 border-yellow-300 text-gray-900 scale-[1.03] shadow-lg' 
                            : 'bg-gray-900/50 border-gray-700 text-gray-300 hover:border-blue-400 hover:bg-gray-800'
                        }`}
                      >
                        <span className={`mr-3 opacity-60 ${isSelected ? 'text-gray-900' : 'text-blue-400'}`}>
                          {['A', 'B', 'C', 'D'][i]}.
                        </span>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            
            {score === null ? (
              <button 
                onClick={submitQuiz} 
                className="w-full bg-green-600 hover:bg-green-500 font-black py-8 rounded-[2rem] text-3xl shadow-2xl transition-all active:scale-95"
              >
                FINISH MISSION 🏁
              </button>
            ) : (
              <div className="mt-10 p-12 glass-card rounded-[3rem] text-center border-4 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.2)]">
                <h2 className="text-6xl font-black text-white mb-4 italic">MISSION SUCCESS!</h2>
                <p className="text-3xl text-gray-400">Analysis: <span className="text-yellow-400 font-black">{((score/questions.length)*100).toFixed(0)}% Accurate</span></p>
                <div className="mt-8 text-2xl font-bold bg-blue-600 inline-block px-10 py-3 rounded-full">
                  {score} / {questions.length} Correct
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

