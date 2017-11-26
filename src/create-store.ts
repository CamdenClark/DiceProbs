import { applyMiddleware, combineReducers, createStore } from "redux";

import * as reducers from "./reducers";

export default function(data = {}) {
  const reducer = combineReducers({...reducers});
  const store = createStore(reducer, data);

  return store;
}