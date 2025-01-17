import React from 'react';
import { useNavigate } from "react-router-dom";
function Contact() {
  const navigate = useNavigate();
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
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          If you have any questions or need help, feel free to reach out to us through the form below.
        </p>

        <div className="bg-white shadow rounded p-6 w-full max-w-xl">
          <form className="flex flex-col space-y-4">
            <label className="font-semibold" htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your name" className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <label className="font-semibold" htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Your email" className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <label className="font-semibold" htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" placeholder="Your message" className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Contact;
