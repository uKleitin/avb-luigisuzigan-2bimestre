import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const category = localStorage.getItem("category");
  const difficulty = localStorage.getItem("difficulty");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Verifica se a API está disponível
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        
        // Verifica se a resposta é válida
        if (!response.ok) {
          throw new Error("Erro ao carregar as perguntas");
        }

        const data = await response.json();
        if (data.results.length === 0) {
          throw new Error("Nenhuma pergunta encontrada");
        }

        setQuestions(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar as perguntas:", error);
        setLoading(false);  // Para parar o carregamento mesmo se ocorrer erro
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

  if (loading) {
    return <div>Carregando perguntas...</div>;
  }

  if (questions.length === 0) {
    return <div>Sem perguntas disponíveis ou erro ao carregar as perguntas.</div>;
  }

  const current = questions[currentQuestion];

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4">
        Pergunta {currentQuestion + 1} de {questions.length}
      </h2>

      <p className="mb-4 text-lg">{current.question}</p>

      <div className="space-y-4">
        {[...current.incorrect_answers, current.correct_answer]
          .sort(() => Math.random() - 0.5) // Embaralha as opções
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
