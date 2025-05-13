import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-3xl shadow-lg mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-500">Resultados do Quiz</h1>

      <div className="mb-6 text-center">
        <p className="text-xl">
          Você acertou <span className="font-semibold text-yellow-400">{score}</span> de{" "}
          <span className="font-semibold text-yellow-400">{totalQuestions}</span> perguntas.
        </p>
        <p className="text-lg mt-2">
          Sua pontuação:{" "}
          <span className="text-green-400">{Math.floor((score / totalQuestions) * 100)}%</span>
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => navigate("/")}
          className="w-32 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold"
        >
          Voltar ao Menu
        </button>
        <button
          onClick={() => navigate("/quiz")}
          className="w-32 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold"
        >
          Reiniciar Quiz
        </button>
      </div>
    </div>
  );
}

export default Result;
