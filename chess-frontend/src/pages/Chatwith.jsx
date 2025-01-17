import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ChessBoard from '../components/ChessPuzzleBoard';

function Chat() {
  const [user, setUser] = useState(null); // Holds chat user details
  const [messages, setMessages] = useState([]); // Holds chat messages
  const { username } = useParams(); // Extract username from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch details of the chosen user
    fetch(`http://192.168.12.32:5000/api/member/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user); // Set the user data
      })
      .catch((error) => console.error(`Error fetching member ${username}:`, error));

    // Fetch chat messages for the chat with this user (assuming we have a chat API)
    fetch(`http://192.168.12.32:5000/api/chat/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.messages); // Set the chat messages
      })
      .catch((error) => console.error("Error fetching chat messages:", error));
  }, [username]);

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
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-center mt-10">
          Chat with {user ? user.user_name : 'Loading...'}
        </h1>

        {/* Display user info or login button */}
        <div className="bg-white shadow rounded p-6 w-full max-w-2xl">
          {user ? (
            <div className="flex items-center mb-4">
              <img
                className="w-16 h-16 object-cover rounded-full mr-4"
                src={user.avatar || '/uploads/flags/AD-128.png'}
                alt={`${user.user_name}'s avatar`}
              />
              <div>
                <h2 className="text-2xl font-semibold">{user.user_name}</h2>
                <p className="text-gray-500">{user.status || 'No status'}</p>
              </div>
            </div>
          ) : (
            <p>Loading user details...</p>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Messages</h3>
            <ul className="space-y-4">
              {messages.map((message, index) => (
                <li key={index} className="flex items-start">
                  <img
                    className="w-12 h-12 object-cover rounded-full mr-4"
                    src={message.senderAvatar || '/uploads/flags/AD-128.png'}
                    alt={`${message.sender} avatar`}
                  />
                  <div className="bg-gray-100 rounded p-4 w-full">
                    <p className="text-gray-800">{message.content}</p>
                    <span className="text-gray-500 text-sm mt-2 block">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded p-6 w-full max-w-2xl">
          <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle message sending (to be implemented)
            }}
            className="flex items-center"
          >
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 rounded mr-4"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Chat;
