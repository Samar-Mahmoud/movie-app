// Header.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetch from "../fetch";

const Header: React.FC = () => {
  const [user, setUser] = useState<{ userId: string; email: string } | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (!token) {
      setUser(null);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await fetch.get("users/current-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        localStorage.setItem("current-user", response.data);
      } catch (err) {
        console.error("Error fetching current user: ", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    setUser(null);
    navigate("/auth/signin", { replace: true });
  };

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <div className="text-xl">Movie Finder</div>

      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded text-white"
            >
              Logout
            </button>
            <button
              onClick={() => navigate("/favorites", { replace: true })}
              className="bg-red-500 px-4 py-2 rounded text-white"
            >
              Favorites
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/auth/signin", { replace: true })}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/auth/signup", { replace: true })}
              className="bg-green-500 px-4 py-2 rounded text-white"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
