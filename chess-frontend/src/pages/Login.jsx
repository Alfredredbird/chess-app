import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '', remember: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username === '' || formData.password === '') {
      setError('Both fields are required');
      return;
    }

    try {
      // Example API request (replace with your API endpoint)
      const response = await fetch('http://192.168.12.32:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Check if "Remember Me" is checked and set the cookie
        if (formData.remember) {
          document.cookie = `authToken=${data.token}; path=/; max-age=${60 * 60 * 24 * 30};`; // Cookie valid for 30 days
        } else {
          document.cookie = `authToken=${data.token}; path=/; max-age=${60 * 60 * 24 * 1};`; // Cookie valid for 1 day
        }

        console.log('Login successful');
        navigate('/home'); // Redirect to dashboard or another page
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="form-checkbox text-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-gray-600">Remember Me</label>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don't have an account? <button type="button" onClick={navigateToSignup} className="text-blue-500 hover:underline">Sign Up</button></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
