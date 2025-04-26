import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Navbar from './components/Navbar.tsx';
import Sign from './pages/Register.tsx';
import Login from './pages/SignIn.tsx';
import About from './pages/About.tsx';
import Analys from './pages/Analys.tsx';
import Profile from './pages/Profile.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/rules" element={<About />} />
        <Route path="/analysis" element={<Analys />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
};

export default App;