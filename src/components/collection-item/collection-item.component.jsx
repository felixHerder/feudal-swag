import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addCartItem, toggleCartHidden } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addCartItem,toggleCartHidden,hidden }) => {
  const {name,price,imageUrl} = item;
  return (<div className="collection-item">
    <div className="image"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className="collection-footer">
      <span className="name">{name}</span>
      <span className="price">${price}</span>
    </div>
    <CustomButton onClick={() =>{ 
      if(hidden) toggleCartHidden() ;
      addCartItem(item);
    }} 
      inverted={true} >Add to Wagon</CustomButton>
  </div>
  );
}
const mapDispatchToProps = dispatch => ({
  addCartItem: item => dispatch(addCartItem(item)),
  toggleCartHidden: ()=>dispatch(toggleCartHidden())
});

const mapStateToProps = state =>({
  hidden: state.cart.hidden
});


export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);