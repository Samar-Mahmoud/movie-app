import { useEffect, useState } from "react";
import fetch from "../fetch";
import { useNavigate } from "react-router-dom";

export type Movie = {
  title: string;
  year: string;
  posterUrl: string;
};

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("user-token");

      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await fetch.get("users/current-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching current user: ", err);
      }
    };

    fetchUser();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      setMovies([]);
      setError("");
      return;
    }

    try {
      const response = await fetch.get("movies/search", {
        params: {
          q: query,
        },
      });
      if (response.status === 200) {
        setMovies(response.data);
        setError("");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "No Results");
    }
  };

  const handleFavoriteClick = async (movie: Movie) => {
    if (!user) {
      navigate("../auth/signin");
    }
    try {
      const token = localStorage.getItem("user-token");
      await fetch.post(`/favorites`, movie, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error saving movie: ", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Search Movies</h1>

      {/* Search Bar */}
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 m-4 text-center ">{error}</p>}

      {/* Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie: Movie, index) => (
          <div
            key={index}
            className="bg-white rounded shadow p-4 hover:shadow-lg transition relative"
          >
            <img
              src={
                movie.posterUrl !== "N/A" ? movie.posterUrl : "/placeholder.png"
              }
              alt={movie.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-500">Year: {movie.year}</p>
            {/* Favorite Icon */}
            <button
              className="absolute bottom-5 right-5 text-red-500 hover:text-red-700"
              onClick={() => handleFavoriteClick(movie)}
              aria-label="Add to favorites"
            >
              ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
