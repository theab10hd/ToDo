import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PnF from "./pages/PnF";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PnF />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />
      </Routes>
    </>
  );
}

export default App;
