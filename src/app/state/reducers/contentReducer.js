import { FAVORITES_STORAGE_KEY, AUTH_TOKEN_STORAGE_KEY } from "../../constants";

const INITIAL_STATE = {
  favorites:
    JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
  movies: [],
};

function contentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "REMOVE_FAVORITE": {
      const newFavorites = state.favorites.filter((id) => id !== action.id);

      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );

      return {
        ...state,
        favorites: newFavorites,
      };
    }

    case "ADD_FAVORITE": {
      const newFavorites = state.favorites.concat(action.id);

      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );

      return { ...state, favorites: newFavorites };
    }

    case "UPDATE_MOVIE_LIST": {
      return { ...state, movies: action.movies };
    }
    default:
      return state;
  }
}

export default contentReducer;
