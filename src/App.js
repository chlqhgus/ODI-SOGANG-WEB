import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import FindingPlace from "./pages/FindPlaces";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/finding-place" element={<FindingPlace />} />
      </Routes>
    </Router>
  );
};

export default App;
