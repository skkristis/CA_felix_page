import { AUTH_TOKEN_STORAGE_KEY } from "../../constants";

const INITIAL_STATE = {
  authToken: window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || "",
};

function contentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {


    case "UPDATE_AUTHTOKEN": {
      window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, action.token);

      return { ...state, authToken: action.token ? action.token : "" };
    }


    default:
      return state;
  }
}

export default contentReducer;
