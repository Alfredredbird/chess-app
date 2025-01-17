import React from 'react';
import { useNavigate } from "react-router-dom";

function ChessOpenings() {
  const navigate = useNavigate();

  const lessons = [
    { name: "The London System", description: "Learn the key moves and setups of the London System, a popular opening known for its solid and flexible nature.", difficulty: "green" },
    { name: "The Queen's Gambit", description: "Master the intricacies of the Queen's Gambit, a dynamic and aggressive opening that can lead to strategic advantages.", difficulty: "orange" },
    { name: "The Sicilian Defense", description: "Explore the Sicilian Defense, a counterattacking opening that provides flexibility and strong pawn structures for Black.", difficulty: "red" },
    { name: "The Ruy Lopez", description: "Delve into the Ruy Lopez, a classic opening with a rich history that leads to complex strategic battles.", difficulty: "orange" },
    { name: "The King's Indian Defense", description: "Learn the King's Indian Defense, a resilient opening for Black that allows counterplay and complex maneuvering.", difficulty: "green" },
    { name: "The Nimzo-Indian Defense", description: "Master the Nimzo-Indian Defense, an opening that offers Black dynamic possibilities and pawn structure flexibility.", difficulty: "orange" },
    { name: "The French Defense", description: "Explore the French Defense, a reliable opening for Black that focuses on solid pawn structures and gradual piece development.", difficulty: "green" },
    { name: "The Slav Defense", description: "Discover the Slav Defense, a strong defense for Black that provides robust pawn structures and opportunities for counterplay.", difficulty: "orange" },
    { name: "The English Opening", description: "Learn the principles of the English Opening, a flexible and strategic opening that allows for creative piece play.", difficulty: "green" },
    { name: "The Albin Countergambit", description: "Understand the Albin Countergambit, an aggressive and tactical opening that puts pressure on White's center early on.", difficulty: "red" },
  ];

  const handleCardClick = (lessonName) => {
    const urlFriendlyName = lessonName.toLowerCase().replace(/ /g, "-");
    navigate(`/tutorials/openings/${urlFriendlyName}`, { state: { lessonName } });
  };

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
          Chess Openings Tutorials
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Enhance your chess opening skills with our step-by-step tutorials. Whether you're a beginner or an experienced player, you'll find valuable tips and strategies to start your games with confidence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {lessons.map((lesson) => (
            <div
              key={lesson.name}
              className="bg-white shadow rounded p-6 hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-pointer"
              onClick={() => handleCardClick(lesson.name)}
            >
              <h2 className="text-2xl font-semibold mb-4">{lesson.name}</h2>
              <p className="text-gray-700 mb-2">{lesson.description}</p>
              <div className={`flex items-center justify-center mt-4 py-2 px-4 rounded ${lesson.difficulty === 'green' ? 'bg-green-400' : lesson.difficulty === 'orange' ? 'bg-orange-400' : 'bg-red-400'} text-white`}>
                {lesson.difficulty === 'green' ? 'Easy' : lesson.difficulty === 'orange' ? 'Challenging' : 'Difficult'}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ChessOpenings;
