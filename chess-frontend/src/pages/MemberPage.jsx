import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MemberPage() {
  const { username } = useParams();
  const { user_id } = useParams();
  const [userData, setUserData] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null); // Logged-in user info
  const [friendRequests, setFriendRequests] = useState([]); // Friend requests state
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie.split("; ").find((row) => row.startsWith("authToken="))?.split("=")[1];
    if (cookie) {
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
            setLoggedInUser(data.user);
          } else {
            console.warn("Invalid authToken:", data.error);
          }
        })
        .catch((error) => console.error("Error verifying cookie:", error));
    } else {
      console.warn("No authToken cookie found.");
    }
  }, []);

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
        console.log(data)
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

    // Fetch friend requests
    if (loggedInUser && userData?.id) {
      fetch(`http://192.168.12.32:5000/api/friend_requests/${userData.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch friend requests");
          }
          return response.json();
        })
        .then((data) => {
          setFriendRequests(data.friend_requests);
        })
        .catch((error) => {
          console.error("Error fetching friend requests:", error);
        });
    }
    
  }, [username, loggedInUser,user_id]);

  const handleAddFriend = () => {
    if (!loggedInUser) {
      alert("You are not logged in!");
      return;
    }

    fetch("http://192.168.12.32:5000/api/add_friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender_username: loggedInUser.user_name,
        receiver_username: userData.user_name,
      }),
    })
      .then((response) => response.json())
      .then((friendData) => {
        if (friendData.success) {
          alert(`${userData.user_name} has been added as a friend!`);
        } else {
          alert("Failed to add friend.");
        }
      })
      .catch((error) => {
        console.error("Error adding friend:", error);
      });
  };

  const isPending = friendRequests.some(
    (request) =>
      request.receiver_id === userData?.id &&
      request.status === "pending"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
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

      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-center mt-10">
          Member Page: {userData.user_name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white shadow rounded p-6 w-full max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Member Information</h2>
              {isPending ? (
                <button
                  className="bg-orange-500 text-white py-2 px-4 rounded cursor-not-allowed"
                  disabled
                >
                  Pending
                </button>
              ) : (
                <button
                  onClick={handleAddFriend}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Add Friend
                </button>
              )}
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
