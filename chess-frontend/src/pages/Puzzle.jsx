import React from 'react';

function PuzzlePage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          MattInOn
        </div>
        <nav className="flex-grow p-4">
          <ul>
            <li className="mb-2">
              <button
                onClick={() => console.log('Navigate to Home')}
                className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              >
                Home
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => console.log('Navigate to Play Chess')}
                className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              >
                Play Chess
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => console.log('Navigate to Leaderboard')}
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
                onClick={() => console.log('Navigate to Profile')}
                className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => console.log('Navigate to Contact')}
                className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
        <footer className="p-4 border-t border-gray-700 text-center text-sm">
          &copy; 2025 MattInOn
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center">
          Puzzle Page
        </h1>
        <p className="text-lg text-gray-700 text-center mt-4">
          Solve exciting chess puzzles and improve your skills!
        </p>
      </main>
    </div>
  );
}

export default PuzzlePage;
