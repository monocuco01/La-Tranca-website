import Home from "./Components/Home/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Menu from "./Components/menu/Menu";
import Detail from "./Components/menu/Detail/Detail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/products/:productId" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
