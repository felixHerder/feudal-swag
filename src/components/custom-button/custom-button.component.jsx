import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignedin, ...otherProps }) => (
  <button className={`${isGoogleSignedin ? 'google-sign-in' : ''}   custom-button`} {...otherProps}>
    {children}
  </button>
)

export default CustomButton;