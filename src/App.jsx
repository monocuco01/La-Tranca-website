import Home from "./Components/Home/Home";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Menu from "./Components/menu/Menu";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/menu" element={<Menu />} />
      </Routes>
    </div>
  );
}

export default App;
