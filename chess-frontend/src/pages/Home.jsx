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
      .then((data) => {
        setLeaderboard(data.leaderboard);

        // Fetch additional member information for each user in the leaderboard
        data.leaderboard.forEach((user) => {
          fetch(`http://192.168.12.32:5000/api/member/${user.user_name}`)
            .then((response) => response.json())
            .then((userData) => {
              // Update the user's information in the leaderboard
              setLeaderboard(prevLeaderboard => {
                return prevLeaderboard.map(member => {
                  if (member.user_name === user.user_name) {
                    return { ...member, ...userData.user };
                  }
                  return member;
                });
              });
            })
            .catch((error) => console.error(`Error fetching member ${user.user_name}:`, error));
        });
      });

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
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
          {user ? (
              <>
                <li className="mb-2">
                  <button
                    onClick={() => navigate('/chat')}
                    className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
                  >
                    Chat
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
              </>
            ) : null}
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
          &copy; 2025 MateInOne
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-8 ">
        <h1 className="text-4xl font-bold mb-4 text-center mt-10">
          Welcome to MateInOne!
        </h1>
        {/* Display user info or login button */}
        {user ? (
    <div className="text-center text-lg mb-4">
      <p>
        Hello, <span className="font-semibold">{user.user_name}</span>! 🎉
      </p>
    </div>
  ) : (
    <button
      className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={() => navigate('/login')}
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
      <li key={index} className="mb-2 flex items-center">
        <span className="mr-2 text-gray-500 font-bold text-xl">
          {index + 1}.
        </span>
        <a
          href={`/member/${user.user_name}`}
          className="text-blue-600  flex items-center"
        >
          <span className="text-gray-800 font-medium">
            {user.user_name}
          </span>
          <span className="ml-2 text-green-600 font-semibold">
            - {user.wins} wins
          </span>
          <img
            className="w-6 h-3 object-cover ml-2"
            src={
              user.country
                ? `/uploads/flags/${user.country}-128.png`
                : '/uploads/flags/AD-128.png'
            }
            alt={`${user.country} flag`}
          />
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
          <a
            href={`/member/${game.player1}`}
            className="text-gray-800 font-medium hover:underline"
          >
            {game.player1}
          </a>{' '}
          <span className="text-gray-500">vs</span>{' '}
          <a
            href={`/member/${game.player2}`}
            className="text-gray-800 font-medium hover:underline"
          >
            {game.player2}
          </a>
        </span>
        <span className="block text-sm text-green-600 font-semibold mt-1">
          Winner: {game.winner || 'Draw'}
        </span>
      </li>
    ))}
  </ul>
</div>


          <div className="bg-white shadow rounded p-6">
            <ChessBoard />
          </div>
          <div className="bg-white shadow rounded p-6">
  <h2 className="text-2xl font-semibold mb-4">Friends</h2>
  </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
