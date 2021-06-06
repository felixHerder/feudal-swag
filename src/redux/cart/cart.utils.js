export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems
    .find(cartItem => cartItem.id === cartItemToAdd.id);
  if(existingCartItem){
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToAdd.id ? 
      {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
      );
  }
  return [...cartItems,{...cartItemToAdd, quantity: 1}];
}

export const removeItemFromCart = (cartItems,cartItemToRemove) =>{
  return cartItems.filter(item=> item !== cartItemToRemove);
}

export const incrementItemFromCart = (cartItems, cartItemToIncrement) =>{
  
  return cartItems.map(item=> item.id === cartItemToIncrement.id ?
    {...item, quantity: item.quantity+1} : item);
}

export const decrementItemFromCart = (cartItems, cartItemToIncrement) =>{
  
  return cartItems.map(item=> (item.id === cartItemToIncrement.id && item.quantity > 1) ?
    {...item, quantity: item.quantity-1} : item);
}