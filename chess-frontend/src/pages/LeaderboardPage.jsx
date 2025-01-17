import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Sidebar component
function Sidebar({ navigate }) {
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
  );
}

// Individual Card component for each user
function UserCard({ user, index }) {
  return (
    <div className="bg-white shadow rounded p-6 flex items-center space-x-4">
      {/* Default image URL if none provided */}
      <img 
        className="w-16 h-16 rounded object-cover" 
        src={user.profile_picture ? `/${user.profile_picture}` : '/uploads/profilepick/default.png'} 
        alt={user.user_name} 
      />
      <div>
        <a href={`/member/${user.user_name}`} className="text-blue-600 hover:underline text-xl">
          {index + 1}. {user.user_name}
        </a>
        <p className="text-gray-600 mt-1">{user.wins} wins</p>
        <img 
        className="w-9 h-6 object-cover" 
        src={`/uploads/flags/${user.country}-128.png` ? `/uploads/flags/${user.country}-128.png` : '/uploads/flags/AD-128.png'} 
        alt=""
      />
      </div>
    </div>
  );
}

// Main content component
function MainContent({ leaderboard }) {
  return (
    <main className="flex-grow flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-center mt-10">
        Leaderboard
      </h1>
      <div className="grid grid-cols-1 gap-8 mt-8 w-full max-w-4xl">
        {leaderboard.map((user, index) => (
          <UserCard key={index} user={user} index={index} />
        ))}
      </div>
    </main>
  );
}

// LeaderboardPage main component
function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch leaderboard data
    fetch('http://192.168.12.32:5000/api/leaderboard')
      .then((response) => response.json())
      .then((data) => setLeaderboard(data.leaderboard))
      .catch((error) => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar navigate={navigate} />

      {/* Main Content */}
      <MainContent leaderboard={leaderboard} />
    </div>
  );
}

export default LeaderboardPage;
