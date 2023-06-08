import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Posts from "./pages/Posts/Posts";
import "./App.css";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Posts" element={<Posts />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
