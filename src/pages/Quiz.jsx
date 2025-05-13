import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState([]); // Iniciar como array vazio
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [answerStatus, setAnswerStatus] = useState(null);

  useEffect(() => {
    const category = localStorage.getItem("category");
    const difficulty = localStorage.getItem("difficulty");

    console.log("Categoria:", category);
    console.log("Dificuldade:", difficulty);

    // Verificar se a categoria e dificuldade existem
    if (!category || !difficulty) {
      console.error("Categoria ou dificuldade não definida no localStorage.");
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      setLoading(true); // Ativar o carregamento

      const apiUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
      console.log("Requisição para URL:", apiUrl);

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Resposta da API:", data); // Exibir resposta da API no console

        if (data.results && data.results.length > 0) {
          setQuestions(data.results); // Definir as perguntas no estado
        } else {
          setQuestions([]); // Se não houver perguntas, definir como array vazio
        }
      } catch (error) {
        console.error("Erro ao carregar as perguntas:", error);
        setQuestions([]); // Caso haja erro, setar como array vazio
      }

      setLoading(false); // Desativar o carregamento
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        navigate("/result", { state: { score, totalQuestions: questions.length } });
      }
    }, 1000);
  };

  // Verificar se as perguntas ainda estão carregando
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-700">
        <div className="animate-spin border-t-4 border-b-4 border-blue-500 w-16 h-16 rounded-full"></div>
      </div>
    );
  }

  // Se não houver perguntas disponíveis, exibir mensagem de erro
  if (!questions.length) {
    return (
      <div className="text-center mt-10 text-white bg-gray-800 p-6 rounded-xl">
        <p>Sem perguntas disponíveis ou erro ao carregar as perguntas.</p>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="text-white max-w-2xl mx-auto mt-10 p-6 bg-gray-800 rounded-xl shadow-xl">
      <h2 className="text-2xl mb-6">{`Pergunta ${currentQuestionIndex + 1} de ${questions.length}`}</h2>
      <h3 className="text-xl font-semibold mb-4">{question.question}</h3>

      <div className="space-y-4">
        {question.incorrect_answers.concat(question.correct_answer).map((answer, index) => (
          <button
            key={index}
            className="w-full py-2 px-4 text-lg text-black bg-white rounded-lg hover:bg-gray-200 transition"
            onClick={() => handleAnswer(answer === question.correct_answer)}
          >
            {answer}
          </button>
        ))}
      </div>

      <div className={`mt-4 text-center text-lg ${answerStatus === "correct" ? "text-green-400" : "text-red-400"}`}>
        {answerStatus === "correct" && "Resposta correta!"}
        {answerStatus === "incorrect" && "Resposta errada!"}
      </div>
    </div>
  );
}

export default Quiz;
