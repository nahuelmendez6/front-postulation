import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PetitionsPage from "./pages/PetitionsPage";
import PetitionDetail from "./components/PetitionDetail";
import MyPostulationsPage from "./pages/MyPostulationsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/petitions" element={<PetitionsPage />} />
        <Route path="/petitions/:id" element={<PetitionDetail />} />
        <Route path="/my-postulations" element={<MyPostulationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;