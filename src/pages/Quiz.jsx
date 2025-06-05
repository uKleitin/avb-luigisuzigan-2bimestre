import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const category = localStorage.getItem("category");
  const difficulty = localStorage.getItem("difficulty");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        if (!response.ok) throw new Error("Erro ao carregar as perguntas");

        const data = await response.json();
        if (data.results.length === 0) throw new Error("Nenhuma pergunta encontrada");

        setQuestions(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar as perguntas:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, difficulty]);

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/result", { state: { score, totalQuestions: questions.length } });
    }
  };

  const toggleFavorite = (question) => {
    const isFavorited = favorites.some((fav) => fav.question === question.question);
    const updatedFavorites = isFavorited
      ? favorites.filter((fav) => fav.question !== question.question)
      : [...favorites, question];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (loading) return <div>Carregando perguntas...</div>;
  if (questions.length === 0) return <div>Sem perguntas disponíveis ou erro ao carregar.</div>;

  const current = questions[currentQuestion];
  const isFavorited = favorites.some((fav) => fav.question === current.question);

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4">
        Pergunta {currentQuestion + 1} de {questions.length}
      </h2>

      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">{current.question}</p>
        <button
          onClick={() => toggleFavorite(current)}
          className={`text-2xl ${isFavorited ? "text-yellow-400" : "text-white"}`}
        >
          ★
        </button>
      </div>

      <div className="space-y-4">
        {[...current.incorrect_answers, current.correct_answer]
          .sort(() => Math.random() - 0.5)
          .map((answer, index) => (
            <button
              key={index}
              onClick={() => checkAnswer(answer)}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
            >
              {answer}
            </button>
          ))}
      </div>
    </div>
  );
}

export default Quiz;
