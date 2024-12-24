import { useEffect, useState } from "react";
import fetch from "../fetch";
import { useNavigate } from "react-router-dom";

export type Movie = {
  title: string;
  year: string;
  posterUrl: string;
  id: string;
};

const Favorites = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editMovie, setEditMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("current-user");
    if (!user) {
      navigate("auth/login", { replace: true });
      return;
    }
    const token = localStorage.getItem("user-token");
    const fetchFavorites = async () => {
      try {
        const response = await fetch.get("favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(response.data);
        if (response.data.length === 0) {
          setMessage("No Favorites");
        }
      } catch (err) {
        console.error("Error fetching favorites: ", err);
      }
    };
    fetchFavorites();
  }, []);

  const handleDelete = async (movieId: string) => {
    try {
      const token = localStorage.getItem("user-token");
      await fetch.delete(`/favorites/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(movies.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleEdit = (movie: Movie) => {
    setIsEditing(true);
    setEditMovie(movie);
  };

  const handleSave = async (updatedMovie: Movie) => {
    try {
      const token = localStorage.getItem("user-token");
      await fetch.patch(`/favorites/${updatedMovie.id}`, updatedMovie, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(
        movies.map((movie) =>
          movie.id === updatedMovie.id ? updatedMovie : movie
        )
      );
      setIsEditing(false);
      setEditMovie(null);
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Favorite Movies</h2>

      {isEditing && editMovie ? (
        <div className="mb-4">
          <h3>Edit Movie</h3>
          <input
            type="text"
            value={editMovie.title}
            onChange={(e) =>
              setEditMovie({ ...editMovie, title: e.target.value })
            }
            className="border px-2 py-1 mb-2"
            placeholder="Title"
          />
          <input
            type="text"
            value={editMovie.year}
            onChange={(e) =>
              setEditMovie({ ...editMovie, year: e.target.value })
            }
            className="border px-2 py-1 mb-2"
            placeholder="Year"
          />
          <button
            onClick={() => handleSave(editMovie)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie: Movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 text-white p-4 rounded shadow-lg"
              >
                <img
                  src={movie.posterUrl ?? "/placeholder.png"}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-xl mb-2">{movie.title}</h3>
                <p className="mb-2">Year: {movie.year}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/search", { replace: true })}
            className="bg-red-500 text-white px-4 py-2 rounded mt-5"
          >
            Find Movies
          </button>
        </>
      )}
    </div>
  );
};

export default Favorites;
