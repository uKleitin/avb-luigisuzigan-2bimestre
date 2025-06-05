import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 text-white p-6 mt-10 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Perguntas Favoritas</h2>
      {favorites.length === 0 ? (
        <p>Você ainda não favoritou nenhuma pergunta.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((q, i) => (
            <li key={i} className="p-4 bg-gray-700 rounded">{q.question}</li>
          ))}
        </ul>
      )}

      <button
        className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
        onClick={() => navigate("/")}
      >
        Voltar para o Início
      </button>
    </div>
  );
}

export default Favorites;
