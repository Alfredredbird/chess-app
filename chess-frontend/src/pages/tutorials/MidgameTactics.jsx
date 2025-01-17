import React from 'react';
import { useNavigate } from "react-router-dom";

function MidgameTactics() {
  const navigate = useNavigate();

  const lessons = [
    { name: "Pins", description: "Understand how to immobilize your opponent's pieces by pinning them to a more valuable piece or the king.", difficulty: "green" },
    { name: "Forks", description: "Learn to attack two or more pieces simultaneously with a single piece, often leading to a material advantage.", difficulty: "orange" },
    { name: "Skewers", description: "Master the skewer tactic, forcing your opponent to move a valuable piece and exposing another piece to capture.", difficulty: "orange" },
    { name: "Discovered Attacks", description: "Unleash powerful attacks by moving one piece to reveal an attack from another, catching your opponent off guard.", difficulty: "green" },
    { name: "Zwischenzug", description: "Explore the intermediate move tactic to disrupt your opponent's plans and gain the upper hand.", difficulty: "green" },
    { name: "Back Rank Checkmates", description: "Learn how to exploit weak back ranks to deliver checkmate, a common theme in midgame and endgame tactics.", difficulty: "orange" },
    { name: "Double Attacks", description: "Understand how to create situations where a single move attacks two targets, often resulting in material gain.", difficulty: "green" },
    { name: "Trapping Pieces", description: "Discover how to restrict your opponent's pieces to render them useless or force their capture.", difficulty: "orange" },
    { name: "Deflection", description: "Learn to distract your opponent's key defensive pieces to open up opportunities for attack.", difficulty: "red" },
    { name: "Overloading", description: "Master the art of overloading your opponent's pieces, forcing them to take on too many defensive tasks.", difficulty: "orange" },
  ];

  const handleCardClick = (lessonName) => {
    const urlFriendlyName = lessonName.toLowerCase().replace(/ /g, "-");
    navigate(`/tutorials/midgametactics/${urlFriendlyName}`, { state: { lessonName } });
  };

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

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-center mt-40">
          Chess Midgame Tactics
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Strengthen your midgame skills with tutorials on essential tactics. Improve your ability to dominate games with these key strategies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {lessons.map((lesson) => (
            <div
              key={lesson.name}
              className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-pointer"
              onClick={() => handleCardClick(lesson.name)}
            >
              <h2 className="text-2xl font-semibold mb-4">{lesson.name}</h2>
              <p className="text-gray-700">{lesson.description}</p>
              <div className={`flex items-center justify-center mt-4 py-2 px-4 rounded ${
                lesson.difficulty === 'green' ? 'bg-green-400' :
                lesson.difficulty === 'orange' ? 'bg-orange-400' :
                lesson.difficulty === 'red' ? 'bg-red-400' :
                ''
              } text-white`}>
                {lesson.difficulty === 'green' ? 'Easy' :
                 lesson.difficulty === 'orange' ? 'Challenging' :
                 'Difficult'}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MidgameTactics;
