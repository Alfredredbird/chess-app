import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; // Tailwind styles
import './App.css'; // Tailwind styles
import MemberPage from './pages/MemberPage.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import Puzzle from './pages/Puzzle.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import Play from './pages/Play.jsx';
import Contact from './pages/Contact.jsx';
import Tutorials from './pages/tutorials/Tutorials.jsx';
import Openings from './pages/tutorials/Openings.jsx';
import Lesson from './pages/tutorials/Lesson.jsx';
import MidgameTactics from './pages/tutorials/MidgameTactics.jsx';
import EndgameTechniques from './pages/tutorials/EndgameTechniques.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/:username" element={<MemberPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/puzzle/" element={<Puzzle />} />
        <Route path="/play/" element={<Play />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/leaderboard/" element={<LeaderboardPage />} />

        <Route path="/tutorials/" element={<Tutorials />} />
        <Route path="/tutorials/openings/" element={<Openings />} />
        <Route path="/tutorials/openings/:lessonName" element={<Lesson />} />
        <Route path="/tutorials/midgametactics/" element={<MidgameTactics />} />
        <Route path="/tutorials/midgametactics/:lessonName" element={<Lesson />} />
        <Route path="/tutorials/endgametechniques/" element={<EndgameTechniques />} />
        <Route path="/tutorials/endgametechniques/:lessonName" element={<Lesson />} />
        
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
