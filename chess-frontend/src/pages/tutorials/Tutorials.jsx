import React from 'react';
import { useNavigate } from "react-router-dom";

function Tutorial() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Chess Website
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
                onClick={() => console.log('Navigate to Tutorials')}
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
          &copy; 2025 Chess Website
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-center mt-40">
          Chess Tutorials
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Enhance your chess skills with our step-by-step tutorials. Whether you're a beginner or an experienced player, you'll find valuable tips and strategies here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8" >
          <div className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out" onClick={() => navigate('/tutorials/openings')}>
            <h2 className="text-2xl font-semibold mb-4">Opening Strategies</h2>
            <p className="text-gray-700">
              Learn various opening strategies to gain an early advantage in your chess games. Master key moves and setups.
            </p>
            <p className="text-sm text-gray-500">Difficulty: <span className="text-green-500">Easy</span></p>
          </div>

          <div className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out" onClick={() => navigate('/tutorials/midgametactics')}>
            <h2 className="text-2xl font-semibold mb-4">Midgame Tactics</h2>
            <p className="text-gray-700">
              Explore common midgame tactics, such as pins, forks, and skewers, to strengthen your game in the middle stages.
            </p>
            <p className="text-sm text-gray-500">Difficulty: <span className="text-orange-500">Challenging</span></p>
          </div>

          <div className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out" onClick={() => navigate('/tutorials/endgametechniques')}>
            <h2 className="text-2xl font-semibold mb-4">Endgame Techniques</h2>
            <p className="text-gray-700">
              Master crucial endgame techniques like king activity, pawn promotion, and checkmating patterns.
            </p>
            <p className="text-sm text-gray-500">Difficulty: <span className="text-red-500">Difficult</span></p>
          </div>

          <div className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Advanced Strategies</h2>
            <p className="text-gray-700">
              Delve into advanced strategies and concepts that elevate your thinking and improve your overall game.
            </p>
            <p className="text-sm text-gray-500">Difficulty: <span className="text-orange-500">Challenging</span></p>
          </div>

          <div className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Puzzle Solving</h2>
            <p className="text-gray-700">
              Sharpen your problem-solving skills with chess puzzles that challenge your tactical understanding.
            </p>
            <p className="text-sm text-gray-500">Difficulty: <span className="text-green-500">Easy</span></p>
          </div>

          <div className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Common Mistakes</h2>
            <p className="text-gray-700">
              Learn to identify and avoid common mistakes made by chess players at different levels.
            </p>
            <p className="text-sm text-gray-500">Difficulty: <span className="text-orange-500">Challenging</span></p>
          </div>

          <div className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Time Management</h2>
            <p className="text-gray-700">
              Master effective time management strategies to make the most out of your clock during chess games.
            </p>
            <p className="text-sm text-gray-500">Difficulty: <span className="text-green-500">Easy</span></p>
          </div>

          <div className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Chess Tournaments</h2>
            <p className="text-gray-700">
              Gain insights into participating in chess tournaments, preparing for matches, and handling pressure.
            </p>
            <p className="text-sm text-gray-500">Difficulty: <span className="text-red-500">Difficult</span></p>
          </div>

          <div className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Endgame Checkmating Patterns</h2>
            <p className="text-gray-700">
              Explore key checkmating patterns in the endgame and understand how to execute them effectively.
            </p>
            <p className="text-sm text-gray-500">Difficulty: <span className="text-red-500">Difficult</span></p>
          </div>

          <div className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Analyzing Your Games</h2>
            <p className="text-gray-700">
              Learn techniques for analyzing your own games to find areas for improvement and refine your strategy.
            </p>
            <p className="text-sm text-gray-500">Difficulty: <span className="text-orange-500">Challenging</span></p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Tutorial;
