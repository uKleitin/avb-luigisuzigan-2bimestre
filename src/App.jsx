import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Menu from "./pages/Menu";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Favorites from "./pages/favorites/Favorites"; // importar

function App() {
  return (

    
    
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/favorites" element={<Favorites />} /> {/* nova rota */}
      </Routes>
    </Router>
    
  );
}

export default App;
