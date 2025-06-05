// src/pages/Menu.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("9"); // 9 = General Knowledge
  const [difficulty, setDifficulty] = useState("easy");

  const startQuiz = () => {
    // Aqui poderíamos enviar para a rota /quiz e guardar os dados depois
    localStorage.setItem("category", category);
    localStorage.setItem("difficulty", difficulty);
    navigate("/quiz");
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Configurar Quiz</h1>

      <div className="mb-4">
        <label className="block mb-1">Categoria:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="9">Conhecimento Geral</option>
          <option value="21">Esportes</option>
          <option value="23">História</option>
          <option value="17">Ciência</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Dificuldade:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="easy">Fácil</option>
          <option value="medium">Média</option>
          <option value="hard">Difícil</option>
        </select>
      </div>

      <button
        onClick={startQuiz}
        className="bg-blue-500 hover:bg-blue-600 w-full py-2 rounded font-semibold"
      >
        Começar Quiz
      </button>
      
      <Link
  to="/favorites"
  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex justify-center mt-6"
>
  Favoritos ★
</Link>
      
    </div>
  );
}

export default Menu;
