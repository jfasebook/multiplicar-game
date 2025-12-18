import { useState } from "preact/hooks";

export default function MultiplicationGame() {
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [gameState, setGameState] = useState<"config" | "playing">("config");
  const [question, setQuestion] = useState<{ a: number; b: number } | null>(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const toggleTable = (num: number) => {
    if (selectedTables.includes(num)) {
      setSelectedTables(selectedTables.filter((n) => n !== num));
    } else {
      setSelectedTables([...selectedTables, num]);
    }
  };

  const startGame = () => {
    if (selectedTables.length === 0) return;
    setGameState("playing");
    setScore({ correct: 0, incorrect: 0 });
    generateQuestion();
  };

  const generateQuestion = () => {
    const table = selectedTables[Math.floor(Math.random() * selectedTables.length)];
    const multiplier = Math.floor(Math.random() * 11); // 0-10
    setQuestion({ a: table, b: multiplier });
    setAnswer("");
    setFeedback(null);
  };

  const checkAnswer = (e: Event) => {
    e.preventDefault();
    if (!question || feedback) return;

    const val = parseInt(answer);
    const correct = question.a * question.b;

    if (val === correct) {
      setScore((s) => ({ ...s, correct: s.correct + 1 }));
      setFeedback({ text: "CRITICAL HIT! 💥", type: "success" });
      setTimeout(generateQuestion, 1500);
    } else {
      setScore((s) => ({ ...s, incorrect: s.incorrect + 1 }));
      setFeedback({ text: `MISS! IT WAS ${correct} 🛡️`, type: "error" });
      setTimeout(generateQuestion, 2000);
    }
  };

  if (gameState === "config") {
    return (
      <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-black/80 backdrop-blur-md rounded-3xl shadow-[0_0_30px_rgba(224,107,255,0.3)] space-y-6 sm:space-y-8 mt-4 border-2 border-[#E06BFF]">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-center text-[#FFC400] uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,196,0,0.8)]">
            Mission Config
          </h2>
          <p className="text-center text-[#E06BFF] text-lg sm:text-xl font-bold tracking-wide">
            SELECT TARGET TABLES
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 px-2 sm:px-4">
          {Array.from({ length: 13 }, (_, i) => i).map((num) => {
            const isSelected = selectedTables.includes(num);
            return (
              <button
                key={num}
                onClick={() => toggleTable(num)}
                className={`
                  relative overflow-hidden group p-3 sm:p-4 rounded-xl transition-all duration-200 transform hover:scale-105 border-2
                  ${isSelected 
                    ? 'bg-[#E06BFF]/20 border-[#E06BFF] shadow-[0_0_15px_rgba(224,107,255,0.5)]' 
                    : 'bg-black/50 border-gray-700 text-gray-400 hover:border-[#FFC400] hover:text-[#FFC400]'
                  }
                `}
              >
                <div className="flex flex-col items-center justify-center space-y-1">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80">TARGET</span>
                  <span className={`text-3xl sm:text-4xl font-black ${isSelected ? 'text-[#E06BFF] drop-shadow-[0_0_5px_rgba(224,107,255,0.8)]' : ''}`}>
                    {num}
                  </span>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 text-[#FFC400] animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center pt-4 sm:pt-6 pb-2">
          <button
            onClick={startGame}
            disabled={selectedTables.length === 0}
            className={`
              w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-none skew-x-[-10deg] text-xl sm:text-2xl font-black tracking-widest shadow-xl transition-all transform duration-300 border-2
              ${selectedTables.length > 0 
                ? 'bg-[#FFC400] text-black border-[#FFC400] hover:bg-black hover:text-[#FFC400] hover:shadow-[0_0_20px_rgba(255,196,0,0.6)]' 
                : 'bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed'
              }
            `}
          >
            <span className="block skew-x-[10deg]">{selectedTables.length > 0 ? 'START MISSION' : 'SELECT TARGETS'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto bg-black/80 backdrop-blur-md rounded-3xl shadow-[0_0_40px_rgba(255,196,0,0.2)] space-y-6 sm:space-y-8 text-center mt-4 border-2 border-[#FFC400] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E06BFF] via-[#FFC400] to-[#E06BFF]"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-[#E06BFF] via-[#FFC400] to-[#E06BFF]"></div>
      
      <div className="flex flex-col sm:flex-row justify-between text-lg sm:text-xl font-bold border-b border-gray-800 pb-4 sm:pb-6 gap-4 sm:gap-0">
        <div className="flex items-center justify-center space-x-2 bg-black/50 px-4 py-2 rounded border border-[#FFC400] text-[#FFC400] shadow-[0_0_10px_rgba(255,196,0,0.3)] w-full sm:w-auto">
          <span className="text-2xl">✨</span>
          <span>HIT: {score.correct}</span>
        </div>
        <div className="flex items-center justify-center space-x-2 bg-black/50 px-4 py-2 rounded border border-[#E06BFF] text-[#E06BFF] shadow-[0_0_10px_rgba(224,107,255,0.3)] w-full sm:w-auto">
          <span>MISS: {score.incorrect}</span>
          <span className="text-2xl">💀</span>
        </div>
      </div>
      
      <div className="py-4 sm:py-8">
        <div className="text-6xl sm:text-9xl font-black mb-8 sm:mb-12 font-mono tracking-tighter flex justify-center items-center gap-2 sm:gap-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <span className="text-[#FFC400]">{question?.a}</span>
          <span className="text-white/50">×</span>
          <span className="text-[#E06BFF]">{question?.b}</span>
        </div>
        
        <form onSubmit={checkAnswer} className="space-y-6 sm:space-y-8 flex flex-col items-center relative z-10 w-full">
          <div className="relative group w-full max-w-xs">
            <input
              type="number"
              value={answer}
              onInput={(e) => setAnswer((e.target as HTMLInputElement).value)}
              className="w-full text-center text-5xl sm:text-7xl font-black border-b-4 border-[#E06BFF] focus:border-[#FFC400] focus:outline-none bg-transparent p-2 sm:p-4 font-mono text-white transition-colors placeholder-gray-700"
              autoFocus
              placeholder="?"
              disabled={!!feedback}
            />
          </div>
          
          <div className="w-full">
            <button
              type="submit"
              disabled={!!feedback || answer === ""}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-transparent text-[#E06BFF] border-2 border-[#E06BFF] text-xl sm:text-2xl font-black rounded-none skew-x-[-10deg] hover:bg-[#E06BFF] hover:text-black hover:shadow-[0_0_20px_rgba(224,107,255,0.6)] transition-all transform disabled:opacity-50 disabled:shadow-none"
            >
              <span className="block skew-x-[10deg]">ATTACK! ⚡</span>
            </button>
          </div>
        </form>
      </div>

      <div className="h-20 sm:h-24 flex items-center justify-center">
        {feedback && (
          <div className={`transform transition-all duration-500 ${feedback.type === 'success' ? 'scale-110' : 'shake'} w-full px-2`}>
            <div className={`text-2xl sm:text-4xl font-black px-4 sm:px-8 py-3 sm:py-4 skew-x-[-10deg] border-2 shadow-[0_0_20px_currentColor] ${
              feedback.type === 'success' 
                ? 'bg-black text-[#FFC400] border-[#FFC400]' 
                : 'bg-black text-[#E06BFF] border-[#E06BFF]'
            }`}>
              <span className="block skew-x-[10deg]">{feedback.text}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="pt-4 sm:pt-6 border-t border-gray-800">
        <button 
          onClick={() => setGameState("config")} 
          className="text-gray-500 hover:text-[#FFC400] font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-colors mx-auto px-4 sm:px-6 py-2 uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Abort Mission
        </button>
      </div>
    </div>
  );
}
