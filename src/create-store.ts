import { applyMiddleware, combineReducers, createStore } from "redux";
// You can go and see the code for this middleware, it's not very complicated and makes a good
// exercise to sharpen your understanding on middlewares.

import * as reducers from "./reducers";

// The data parameter that we see here is used to initialize our Redux store with data. We didn't
// talk about this yet for simplicity but thanks to it your reducers can be initialized
// with real data if you already have some. For example in an isomorphic/universal app where you
// fetch data server-side, serialize and pass it to the client, your Redux store can be
// initialized with that data.
// We're not passing any data here but it's good to know about this createStore's ability.
export default function(data = {}) {
  const reducer = combineReducers({...reducers});
  const store = createStore(reducer, data);

  return store;
}