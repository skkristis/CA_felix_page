import { useState, useCallback, useEffect } from "react";

import MovieCard from "../../components/MovieCard";
import "./index.css";

const PAID_MOVIES_API = "https://dummy-video-api.onrender.com/content/items";

function Content({ favorites, toggleFavorite, authToken }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(PAID_MOVIES_API, {
        headers: { authorization: authToken },
      });

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
    <div className="Content">
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

export default Content;
