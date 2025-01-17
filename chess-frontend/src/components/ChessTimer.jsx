import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChessTimer() {
  const [whiteTime, setWhiteTime] = useState(300); // Default to 5 minutes for white
  const [blackTime, setBlackTime] = useState(300); // Default to 5 minutes for black
  const [activeClock, setActiveClock] = useState('white'); // Whose turn it is
  const [isRunning, setIsRunning] = useState(false);

  // Fetch game data when Start button is pressed
  const fetchGameData = async () => {
    try {
      console.log('Fetching game data...');
      const response = await axios.get('http://192.168.12.32:5000/api/games/1');

      console.log('Game data fetched:', response.data);
  
      const gameData = response.data.game;
      const blackTimeParts = gameData.black.split(':');
      const whiteTimeParts = gameData.white.split(':');
  
      const blackTotalTime = parseInt(blackTimeParts[0]) * 60 + parseInt(blackTimeParts[1]);
      const whiteTotalTime = parseInt(whiteTimeParts[0]) * 60 + parseInt(whiteTimeParts[1]);
  
      // Update state only if data is fetched successfully
      if (!isNaN(blackTotalTime)) setBlackTime(blackTotalTime);
      if (!isNaN(whiteTotalTime)) setWhiteTime(whiteTotalTime);
  
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };
  
  
  

  // Update the active clock every second
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (activeClock === 'white') {
        setWhiteTime((prevTime) => Math.max(prevTime - 1, 0));
      } else {
        setBlackTime((prevTime) => Math.max(prevTime - 1, 0));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, activeClock]);

  const toggleClock = () => {
    if (whiteTime === 0 || blackTime === 0) return; // Stop if a clock runs out
    setActiveClock(activeClock === 'white' ? 'black' : 'white');
    setIsRunning(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-2">
      {/* Black's Clock */}
      <div className="flex flex-col items-center mx-2">
        <h2 className="text-sm font-semibold">Black</h2>
        <div
          className={`text-4xl font-mono ${
            activeClock === 'black' ? 'text-red-500' : 'text-gray-800'
          }`}
        >
          {formatTime(blackTime)}
        </div>
      </div>

      {/* Start Button */}
      <button
          onClick={() => {
            fetchGameData(); // Fetch data from API and update timer
            setIsRunning(true); // Start the timer
          }}
          className="bg-blue-600 text-white mx-4 px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
        >
          Start Game
      </button>


      {/* White's Clock */}
      <div className="flex flex-col items-center mx-2">
        <h2 className="text-sm font-semibold">White</h2>
        <div
          className={`text-4xl font-mono ${
            activeClock === 'white' ? 'text-red-500' : 'text-gray-800'
          }`}
        >
          {formatTime(whiteTime)}
        </div>
      </div>
    </div>
  );
}

export default ChessTimer;
