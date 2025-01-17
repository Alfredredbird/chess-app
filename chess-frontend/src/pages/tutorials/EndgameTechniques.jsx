import React from 'react';
import { useNavigate } from "react-router-dom";

function EndgameTechniques() {
  const navigate = useNavigate();

  const lessons = [
    { name: "King and Pawn Endings", description: "Master the key principles of King and Pawn Endings, focusing on checkmating techniques and drawing potential.", difficulty: "green" },
    { name: "Rook and King Endings", description: "Learn essential strategies in Rook and King Endings, including the opposition, triangulation, and active rook usage.", difficulty: "orange" },
    { name: "Bishop and Knight Endings", description: "Explore the unique characteristics of Bishop and Knight Endings and how to convert material advantages into victories.", difficulty: "orange" },
    { name: "Queen and Pawn Endings", description: "Understand the fundamental ideas in Queen and Pawn Endings, such as zugzwang and opposition, for effective endgame play.", difficulty: "green" },
    { name: "Opposition and Distance", description: "Delve into the concept of opposition and how to use distance to your advantage in endgame scenarios.", difficulty: "green" },
    { name: "Zugzwang and Tactics", description: "Discover the power of Zugzwang and tactical motifs that arise in the endgame, leading to decisive results.", difficulty: "orange" },
    { name: "King Activity and Safety", description: "Learn how to maximize your king’s activity and ensure its safety while maneuvering towards victory.", difficulty: "green" },
    { name: "Conversion of Material", description: "Master the techniques for converting material advantages into winning endgames, focusing on precise moves and planning.", difficulty: "orange" },
    { name: "Queen's Opposition", description: "Study the intricacies of the Queen's Opposition and how it can lead to favorable results in endgame scenarios.", difficulty: "red" },
    { name: "Drawish Positions", description: "Explore common drawish endgame positions and strategies to avoid or defend effectively against them.", difficulty: "orange" },
  ];

  const handleCardClick = (lessonName) => {
    const urlFriendlyName = lessonName.toLowerCase().replace(/ /g, "-");
    navigate(`/tutorials/endgametechniques/${urlFriendlyName}`, { state: { lessonName } });
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
          Chess Endgame Techniques
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Enhance your chess endgame skills with our step-by-step tutorials. Whether you're a beginner or an advanced player, you'll find valuable tips and strategies to close your games with confidence.
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

export default EndgameTechniques;
