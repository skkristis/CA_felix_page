import { legacy_createStore as createStore, combineReducers } from "redux";
import contentReducer from "./reducers/contentReducer";
import authenticationReducer from "./reducers/authentificationReducer";

const rootReducer = combineReducers({
  content: contentReducer,
  authentication: authenticationReducer,
});

const store = createStore(rootReducer);

export default store;
