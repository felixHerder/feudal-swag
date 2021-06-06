import React from 'react';
import {connect} from 'react-redux';

import {removeCartItem, incrementItemQuant, decrementItemQuant} from '../../redux/cart/cart.actions';
import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem:{name,quantity,price,imageUrl}, cartItem, dispatch})=>(
  <div className="checkout-item">
    <div className="image-container">
      <img src={imageUrl} alt="item" />
    </div>
    <span className="name">{name}</span>
    <span className="quantity">
      <span  onClick={()=> dispatch(decrementItemQuant(cartItem))}
      className="quantity-button" >&lt;</span>
      {quantity}
      <span 
       onClick={()=> dispatch(incrementItemQuant(cartItem))} 
      className="quantity-button" >&gt;</span>
      </span>
    <span className="price">${price} </span>
    <div onClick={()=>dispatch(removeCartItem(cartItem))}
     className="remove-button">&#10005;</div>
  </div>
)

export default connect(null)(CheckoutItem);