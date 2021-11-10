import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
// import logger from "redux-logger";

import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";
import shopReducer from "./shop/shop.reducer";
import favsReducer from "./favs/favs.reducer";
import reviewsReducer from "./reviews/reviews.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  favs: favsReducer,
  shop: shopReducer,
  reviews: reviewsReducer,
});

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
