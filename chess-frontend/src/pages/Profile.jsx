import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function EditProfilePage() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    user_name: '',
    description: '',
    profile_picture: null, // Added state for profile picture
    theme: ''
  });
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('authToken='))
      ?.split('=')[1];
    // First, verify if the user is logged in
    fetch(`http://192.168.12.32:5000/api/verify_cookie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cookie })
    })
      .then((response) => {
        if (!response.ok) {
          throw new navigate('/login');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setIsVerified(true);
          fetchUserData(data.user.user_name);
        } else {
          alert('You need to be logged in to access this page.');
          window.location.href = '/login';
        }
      })
      .catch((error) => {
        console.error('Error verifying cookie:', error);
        navigate('/login');
      });
  }, []);

  const fetchUserData = (userName) => {
    fetch(`http://192.168.12.32:5000/api/member/${userName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.user);
        setFormData({
          user_name: data.user.user_name,
          description: data.user.description
        });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_picture: e.target.files[0]
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];
  
    // Prepare form data with text fields
    const formData = new FormData();
    formData.append('user_name', formData.user_name);
    formData.append('description', formData.description);
    formData.append('theme', formData.theme);
    formData.append('profilepick', 'profilepick');
    console.log(formData.profile_picture)
    console.log(formData.theme)
    // If a file is selected, append it to formData
    if (formData.profile_picture) {
      formData.append('profile_picture', formData.profile_picture);
    }
  
    // First, upload the profile picture if available
    if (formData.profile_picture) {
      fetch('http://192.168.12.32:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to upload image');
          }
          return response.json();
        })
        .then(imageData => {
          // Once image is uploaded successfully, update the profile
          updateProfile(imageData.imageUrl);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    } else {
      updateProfile(null); // No image provided
    }
  };
  const handleLogout = () => {
    fetch('http://192.168.12.32:5000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to log out');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          document.cookie = 'authToken=; Max-Age=0'; // Clear the cookie on the client side
          window.location.href = '/'; // Redirect to the main page
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };
  const updateProfile = (imageUrl) => {
    const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];
  
    const profileData = {
      user_name: formData.user_name,
      description: formData.description,
      profile_picture: imageUrl, // Pass the uploaded image URL if available
      theme: formData.theme
    };
  
    fetch('http://192.168.12.32:5000/api/member/edit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        return response.json();
      })
      .then(data => {
        console.log('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };
  

  if (!userData) {
    return <div>Loading...</div>;
  }

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
            <li>
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 px-3 rounded bg-red-600 hover:bg-red-700"
            >
              Logout
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
        <h1 className="text-4xl font-bold mb-4 text-center mt-10">Edit Profile</h1>
        <div className="grid grid-cols-1 gap-8 mt-8">
          {/* Profile Edit Form */}
          <form className="bg-white shadow rounded p-6 w-full max-w-4xl" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4">Edit Your Information</h2>
            <div className="mb-4">
              <label htmlFor="user_name" className="block text-gray-700">User Name</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-4">
  <label htmlFor="theme" className="block text-gray-700">Theme</label>
  <select
    id="theme"
    name="theme"
    value={formData.theme}
    onChange={handleInputChange}
    className="mt-2 p-2 w-full border border-gray-300 rounded"
  >
    <option value="">Select a theme</option>
    <option value="Grass">Grass</option>
    <option value="Ice">Ice</option>
    <option value="Fire">Fire</option>
    <option value="Default">Default</option>
  </select>
</div>

            <div className="mb-4">
              <label htmlFor="profile_picture" className="block text-gray-700">Profile Picture</label>
              <input
                type="file"
                id="profile_picture"
                name="profile_picture"
                onChange={handleFileChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditProfilePage;
