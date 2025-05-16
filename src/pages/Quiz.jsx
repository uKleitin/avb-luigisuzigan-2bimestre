import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answerStatus, setAnswerStatus] = useState(null);

  useEffect(() => {
    const category = localStorage.getItem("category");
    const difficulty = localStorage.getItem("difficulty");

    if (!category || !difficulty) {
      console.error("Categoria ou dificuldade não definida no localStorage.");
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        const apiUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setQuestions(data.results);
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
    }

    setTimeout(() => {
      setAnswerStatus(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        navigate("/result", { state: { score, totalQuestions: questions.length } });
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-700">
        <div className="animate-spin border-t-4 border-b-4 border-blue-500 w-16 h-16 rounded-full"></div>
      </div>
    );
  }

  if (!questions.length || !questions[currentQuestionIndex]) {
    return (
      <div className="text-center mt-10 text-white bg-gray-800 p-6 rounded-xl">
        <p>Sem perguntas disponíveis ou erro ao carregar as perguntas.</p>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];
  const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

  return (
    <div className="text-white max-w-2xl mx-auto mt-10 p-6 bg-gray-800 rounded-xl shadow-xl">
      <h2 className="text-2xl mb-6">{`Pergunta ${currentQuestionIndex + 1} de ${questions.length}`}</h2>
      <h3 className="text-xl font-semibold mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />

      <div className="space-y-4">
        {answers.map((answer, index) => (
          <button
            key={index}
            className="w-full py-2 px-4 text-lg text-black bg-white rounded-lg hover:bg-gray-200 transition"
            onClick={() => handleAnswer(answer === question.correct_answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>

      {answerStatus && (
        <div
          className={`mt-4 text-center text-lg ${
            answerStatus === "correct" ? "text-green-400" : "text-red-400"
          }`}
        >
          {answerStatus === "correct" ? "Resposta correta!" : "Resposta errada!"}
        </div>
      )}
    </div>
  );
}

export default Quiz;
