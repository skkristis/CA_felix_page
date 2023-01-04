import { legacy_createStore as createStore, combineReducers } from "redux";
import contentReducer from "./reducers/contentReducer";

const rootReducer = combineReducers({
  content: contentReducer,
});

const store = createStore(rootReducer);

export default store;
