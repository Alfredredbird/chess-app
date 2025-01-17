import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ChessBoard from '../components/ChessPuzzleBoard';

function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [user, setUser] = useState(null); // Holds user info if logged in
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch leaderboard and recent games
    fetch('http://192.168.12.32:5000/api/leaderboard')
      .then((response) => response.json())
      .then((data) => setLeaderboard(data.leaderboard));

    fetch('http://192.168.12.32:5000/api/recent_games')
      .then((response) => response.json())
      .then((data) => setRecentGames(data.recent_games));

    // Check for cookie
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('authToken='))
      ?.split('=')[1];

    if (cookie) {
      fetch('http://192.168.12.32:5000/api/verify_cookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookie }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user);
          }
        })
        .catch(() => console.error("Cookie verification failed"));
    }
  }, []);

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
            <li>
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
      <main className="flex-grow flex flex-col items-center p-8 ">
        <h1 className="text-4xl font-bold mb-4 text-center mt-40">
          Welcome to Chess World!
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Join us to play exciting chess games, learn strategies, and compete with others worldwide.
        </p>
        {user ? (
          <h2 className="text-2xl text-green-500">
            Hello, {user.user_name}!
          </h2>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        )}

        {/* Leaderboard and Recent Games */}
        <div className="grid grid-cols-2 gap-8 mt-8">
          {/* Leaderboard Widget */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
            <ul>
              {leaderboard.map((user, index) => (
                <li key={index} className="mb-2">
                  <a href={`/member/${user.user_name}`} className="text-blue-600 hover:underline">
                    {index + 1}. {user.user_name} - {user.wins} wins
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Games Widget */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Games</h2>
            <ul>
              {recentGames.map((game) => (
                <li key={game.id} className="mb-4">
                  <span>
                    <a href={`/member/${game.player1}`} className="text-blue-600 hover:underline">
                      {game.player1}
                    </a>{' '}
                    vs{' '}
                    <a href={`/member/${game.player2}`} className="text-blue-600 hover:underline">
                      {game.player2}
                    </a>
                  </span>
                  <span className="text-sm text-green-500 font-semibold">
                    Winner: {game.winner || 'Draw'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white shadow rounded p-6">
            <ChessBoard />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
