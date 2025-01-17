import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Lesson() {
  const { lessonName } = useParams();
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState(null);
  const [currentPart, setCurrentPart] = useState('P1'); // default to first part

  useEffect(() => {
    fetch(`http://192.168.12.32:5000/api/lesson/${lessonName}`)
      .then((response) => response.json())
      .then((data) => {
        setLessonData(data);
        setCurrentPart('P1'); // reset to the first part
      })
      .catch((error) => console.error('Error fetching lesson data:', error));
  }, [lessonName]);

  const handlePrevious = () => {
    if (!lessonData) return;
    const partKeys = Object.keys(lessonData);
    const currentIndex = partKeys.indexOf(currentPart);
    if (currentIndex > 0) {
      setCurrentPart(partKeys[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (!lessonData) return;
    const partKeys = Object.keys(lessonData);
    const currentIndex = partKeys.indexOf(currentPart);
    if (currentIndex < partKeys.length - 1) {
      setCurrentPart(partKeys[currentIndex + 1]);
    }
  };

  const renderChessboard = (fen) => {
    if (!fen) return null;

    const rows = fen.split(' ')[0].split('/');
    const board = [];

    rows.forEach((row, rowIndex) => {
      const squares = [];
      for (const char of row) {
        if (isNaN(char)) {
          squares.push(char);
        } else {
          for (let i = 0; i < parseInt(char, 10); i++) {
            squares.push(null);
          }
        }
      }
      board.push(squares);
    });

    const pieceMap = {
      k: 'BK.png',
      q: 'BQ.png',
      r: 'BR.png',
      b: 'BB.png',
      n: 'BN.png',
      p: 'BP.png',
      K: 'WK.png',
      Q: 'WQ.png',
      R: 'WR.png',
      B: 'WB.png',
      N: 'WN.png',
      P: 'WP.png',
    };

    return (
      <div className="chessboard grid grid-cols-8 border border-black">
        {board.flat().map((square, index) => {
          const isWhite = (Math.floor(index / 8) + (index % 8)) % 2 === 0;
          const squareStyle = isWhite ? 'bg-gray-200' : 'bg-gray-800';

          return (
            <div
              key={index}
              className={`w-16 h-16 flex items-center justify-center ${squareStyle}`}
            >
              {square && (
                <img
                  src={`/uploads/pieces/${pieceMap[square]}`}
                  alt={square}
                  className="w-12 h-12"
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (!lessonData) {
    return <div>Loading lesson details...</div>;
  }

  const partKeys = Object.keys(lessonData);
  const currentIndex = partKeys.indexOf(currentPart);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Chess Website
        </div>
        <nav className="flex-grow p-4 overflow-y-auto">
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

      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-center mt-40">
          {lessonName.replace(/-/g, ' ')}
        </h1>

        <div className="mt-10 w-full max-w-3xl bg-white p-6 rounded shadow-md mb-6">
          {lessonData[currentPart]?.Explanation ? (
            <div>
              <h2 className="text-2xl font-bold mb-2">Explanation</h2>
              <p className="text-gray-700">
                {typeof lessonData[currentPart]?.Explanation === 'string'
                  ? lessonData[currentPart]?.Explanation
                  : lessonData[currentPart]?.Explanation?.map((exp, index) => (
                      <p key={index}>{exp}</p>
                    ))}
              </p>
            </div>
          ) : (
            <p>No explanation available for this part.</p>
          )}
        </div>

        <section className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
          {renderChessboard(lessonData[currentPart]?.FEN)}
        </section>

        <div className="mt-6 w-full max-w-3xl bg-white p-6 rounded shadow-md flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:bg-gray-400"
            disabled={currentPart === 'P1'}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:bg-gray-400"
            disabled={currentPart === partKeys[partKeys.length - 1]}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default Lesson;
