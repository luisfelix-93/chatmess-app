import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/base.css';
import Join from './pages/Join';
import Chat from "./pages/Chat";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />}/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
