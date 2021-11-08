import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [thunk];

//redux devtool extension
let composeEnhancers;
if (process.env.NODE_ENV === "development") {
  // middlewares.push(logger);
  composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })) ||
    compose;
} else {
  composeEnhancers = compose;
}
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export default store;
