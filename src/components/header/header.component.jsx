import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils.js';
import { ReactComponent as Logo } from '../../assets/banner.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser,hidden }) => (
  <div className="header">
    <Link className="logo-container" to='/'>
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
        </Link>
      <Link className="option" to="/contact" >
        CONTACT
        </Link>
      {
        currentUser ?
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT</div>
          :
          <Link className="option" to="/signin" >
            SIGN IN
          </Link>
      }
      <CartIcon />
    </div>
    {
      hidden ? null
      : <CartDropDown />
    }
  </div>
)
const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser, 
  hidden: selectCartHidden
});

export default connect(mapStatetoProps)(Header);