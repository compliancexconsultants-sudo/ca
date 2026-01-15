import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CaseDetails from "./pages/CaseDetails";
import Chat from "./pages/chat/CaChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/case/:caseId" element={<CaseDetails />} />
        <Route path="/chat/:caseId" element={<Chat />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
