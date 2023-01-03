import { useState, useCallback, useEffect } from "react";

import "./index.css";
import MovieCard from "../../components/MovieCard";

const FREE_MOVIES_API =
  "https://dummy-video-api.onrender.com/content/free-items";

function Home({ favorites, toggleFavorite }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(FREE_MOVIES_API);

      if (response.status > 399 && response.status < 600) {
        throw new Error("failed to load");
      }

      const resultData = await response.json();

      setMovies(resultData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="Home">
      {loading && <p>Loading...</p>}
      {error && <p>Whoops! Movies stolen by pirate clouds! 😱🏴‍☠️☁️</p>}
      {movies.map(({ title, id, description, image }) => (
        <MovieCard
          id={id}
          key={id}
          title={title}
          description={description}
          image={image}
          isFavorite={favorites.includes(id)}
          onToggleFavorite={() => toggleFavorite(id)}
        />
      ))}
    </div>
  );
}

export default Home;
