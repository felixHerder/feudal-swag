import {combineReducers} from 'redux';

import cartReducer from './cart/cart.reducer';
import userReducer from './user/user.reducer';
import shopReducer from './shop/shop.reducer';
import favsReducer from './favs/favs.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  favs: favsReducer,
  shop: shopReducer
})

export default rootReducer;