import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

function App() {
  console.log("App carregado!");
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
