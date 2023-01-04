import { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";

import MovieCard from "../../components/MovieCard";
import "./index.css";

import { PAID_MOVIES_API } from "../../constants";

function Content({
  favorites,
  toggleFavorite,
  authToken,
  movies,
  updateMovies,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(
    async (fetchUrl) => {
      setLoading(true);

      try {
        const response = await fetch(fetchUrl, {
          headers: { authorization: authToken },
        });

        if (response.status > 399 && response.status < 600) {
          throw new Error("failed to load");
        }

        const resultData = await response.json();

        console.log(resultData);
        updateMovies(resultData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [authToken]
  );

  useEffect(() => {
    fetchData(PAID_MOVIES_API);
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
          onToggleFavorite={() => toggleFavorite(id, favorites.includes(id))}
        />
      ))}
    </div>
  );
}

function MapStateToProps(state) {
  return {
    favorites: state.content.favorites,
    authToken: state.content.authToken,
    movies: state.content.movies,
  };
}

function MapDispatchToProps(dispatch) {
  return {
    toggleFavorite: (id, isFavorite) => {
      if (isFavorite) {
        dispatch({ type: "REMOVE_FAVORITE", id });
      } else {
        dispatch({ type: "ADD_FAVORITE", id });
      }
    },
    updateMovies: (movies) => {
      dispatch({ type: "UPDATE_MOVIE_LIST", movies });
    },
  };
}

export default connect(MapStateToProps, MapDispatchToProps)(Content);
