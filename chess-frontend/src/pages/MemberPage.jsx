import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function MemberPage() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`http://192.168.12.32:5000/api/member/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        return response.json();
      })
      .then((data) => {
        setUserData(data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });

    // Fetch recent games
    fetch(`http://192.168.12.32:5000/api/recent_games/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recent games');
        }
        return response.json();
      })
      .then((data) => {
        setRecentGames(data.recent_games);
      })
      .catch((error) => {
        console.error('Error fetching recent games:', error);
      });
  }, [username]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          MateInOne
        </div>
        <nav className="flex-grow p-4">
          <ul>
            <li className="mb-2">
              <a
                href="/"
                className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              >
                Home
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/play"
                className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              >
                Play Chess
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/leaderboard"
                className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              >
                Leaderboard
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/tutorials"
                className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              >
                Tutorials
              </a>
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
              <a
                href="/contact"
                className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <footer className="p-4 border-t border-gray-700 text-center text-sm">
          &copy; 2025 MateInOne
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-center mt-10">
          Member Page: {userData.user_name}
        </h1>
        <div className="grid grid-cols-2 gap-8 mt-8">
          {/* InfoCard */}
          <div className="bg-white shadow rounded p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4">Member Information</h2>
            <p className="text-lg mb-2">Wins: {userData.wins}</p>
            <p className="text-lg mb-2">Created At: {userData.created_at}</p>
            <p className="text-lg mb-2">User ID: {userData.id}</p>
            <p className="text-lg mb-4">Description: {userData.description}</p>
            <img className="w-9 h-6 object-cover" src={`/uploads/flags/${userData.country}-128.png` ? `/uploads/flags/${userData.country}-128.png` : '/uploads/flags/AD-128.png'} alt=""/>
          </div>
          { /* Memver PFP */}
          <div className="bg-white shadow rounded p-6 w-full max-w-4xl">
          <img 
            src={userData.user_pfp ? `/${userData.user_pfp}` : '/uploads/profilepick/default.png'} 
            alt="" 
            className="rounded mx-auto mb-4 w-full md:w-1/3 lg:w-1/4 xl:w-1/5" 
          />


          </div>

          {/* Recent Games */}
          <div className="bg-white shadow rounded p-6 w-full max-w-4xl">
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
        </div>
      </main>
    </div>
  );
}

export default MemberPage;
