import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MemberPage() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://192.168.12.32:5000/api/member/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });

    // Fetch recent games
    fetch(`http://192.168.12.32:5000/api/recent_games/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recent games");
        }
        return response.json();
      })
      .then((data) => {
        setRecentGames(data.recent_games);
      })
      .catch((error) => {
        console.error("Error fetching recent games:", error);
      });
  }, [username]);

  const handleAddFriend = () => {
    console.log("handleAddFriend triggered");  // Debugging step
    const cookie = document.cookie.split("; ").find((row) => row.startsWith("authToken="))?.split("=")[1];
  
    if (!cookie) {
      alert("You are not logged in!");
      return;
    }
  
    // Verify the user's cookie
    fetch("http://192.168.12.32:5000/api/verify_cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cookie }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Cookie verified successfully");
          const loggedInUser = data.user.user_name;
  
          fetch("http://192.168.12.32:5000/api/add_friend", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sender_username: loggedInUser,
              receiver_username: userData.user_name,
            }),
          })
            .then((response) => response.json())
            .then((friendData) => {
              console.log(friendData);  // Debugging step
              if (friendData.success) {
                alert(`${userData.user_name} has been added as a friend!`);
              } 
            })
            .catch((error) => {
              console.error("Error adding friend:", error);
              alert("Failed to add friend.");
            });
        } else {
          alert(data.error || "Invalid login session.");
        }
      })
      .catch((error) => {
        console.error("Error verifying cookie:", error);
        alert("Failed to verify login session.");
      });
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

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
                onClick={() => navigate("/profile")}
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
          </ul>
        </nav>
        <footer className="p-4 border-t border-gray-700 text-center text-sm">
          &copy; 2025 MateInOne
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-center mt-10">
          Member Page: {userData.user_name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* User Info Card */}
          <div className="bg-white shadow rounded p-6 w-full max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Member Information</h2>
              <button
                onClick={handleAddFriend}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add Friend
              </button>
            </div>
            <div className="flex items-center gap-6">
              <img
                src={
                  userData.user_pfp
                    ? `/${userData.user_pfp}`
                    : "/uploads/profilepick/default.png"
                }
                alt="User Profile"
                className="rounded-full w-24 h-24 border border-gray-300"
              />
              <div>
                <p className="text-lg">
                  <span className="font-semibold">Wins:</span> {userData.wins}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Created At:</span>{" "}
                  {userData.created_at}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">User ID:</span> {userData.id}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Description:</span>{" "}
                  {userData.description}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Games */}
          <div className="bg-white shadow rounded p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4">Recent Games</h2>
            <ul>
              {recentGames.map((game) => (
                <li
                  key={game.id}
                  className="mb-4 p-3 border border-gray-200 rounded"
                >
                  <span>
                    <a
                      href={`/member/${game.player1}`}
                      className="text-blue-600 hover:underline"
                    >
                      {game.player1}
                    </a>{" "}
                    vs{" "}
                    <a
                      href={`/member/${game.player2}`}
                      className="text-blue-600 hover:underline"
                    >
                      {game.player2}
                    </a>
                  </span>
                  <span className="ml-4 text-sm text-green-500 font-semibold">
                    Winner: {game.winner || "Draw"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MemberPage;
