import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnalizarPage from "./pages/AnalizarPage";
import InformePdfPage from "./pages/InformePdfPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnalizarPage />} />
        <Route path="/informe-pdf" element={<InformePdfPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
