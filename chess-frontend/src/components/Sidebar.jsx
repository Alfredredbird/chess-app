import React from 'react';
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        MateInOne
      </div>
      <nav className="flex-grow p-4">
        <ul>
          <li className="mb-2">
            <button
              onClick={() => navigate('/')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            >
              Home
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => navigate('/play')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            >
              Play Chess
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => navigate('/leaderboard')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            >
              Leaderboard
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => navigate('/tutorials')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            >
              Tutorials
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => navigate('/profile')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            >
              Profile
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => navigate('/contact')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
      <footer className="p-4 border-t border-gray-700 text-center text-sm">
        &copy; 2025 MateInOne
      </footer>
    </aside>
  );
}

export default Sidebar;
