import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Navbar from './components/Navbar.tsx';
import Sign from './pages/Register.tsx';
import Login from './pages/SignIn.tsx';
import About from './pages/About.tsx';
import Analys from './pages/Analys.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rules" element={<About />} />
        <Route path="/analysis" element={<Analys />} />

      </Routes>
    </Router>
  );
};

export default App;
