import { combineReducers, createStore } from "redux";
import sessionReducer from "redux/reducers/session";

const store = createStore(
  combineReducers({
    session: sessionReducer,
  }),
);

export default store;
