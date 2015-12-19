import {createStore, applyMiddleware} from "redux";
import createLogger                   from "redux-logger";
import combinedReducer                from "./combinedReducer";
import asyncActionsMiddleware         from "app/middleware/async_actions_middleware";


let createStoreWithMiddleware = applyMiddleware(
  asyncActionsMiddleware,
  createLogger({
    predicate: (getState, action) => process.env.NODE_ENV !== "production"
  })
)(createStore);


export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(combinedReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./combinedReducer", () => {
      const nextCombinedReducer = require("./combinedReducer");
      store.replaceReducer(nextCombinedReducer);
    });
  }

  return store;
}
