import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Chat() {
  const [chats, setChats] = useState([]); // Holds ongoing chat details
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch ongoing chats
    fetch('http://192.168.12.32:5000/api/ongoing_chats')
      .then((response) => response.json())
      .then((data) => setChats(data.chats))
      .catch((error) => console.error('Error fetching chats:', error));
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
          Ongoing Chats
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Chat List */}
          {chats.map((chat, index) => (
            <div key={index} className="bg-white shadow rounded p-6">
              <h2 className="text-2xl font-semibold mb-4">Chat with {chat.otherUser}</h2>
              <ul>
                {chat.messages.slice(-5).map((message, msgIndex) => (
                  <li key={msgIndex} className="mb-2 flex items-center justify-between">
                    <div>
                      <span className="text-gray-800 font-medium">{message.sender}</span>:
                      <span className="ml-2 text-gray-600">{message.content}</span>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate(`/chat/${chat.chatId}`)}
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Open Chat
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Chat;
