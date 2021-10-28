import React from "react";

import { CustomButtonContainer } from "./custom-button.styles.jsx";

const CustomButton = ({ children, ...otherProps }) => <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>;

export default CustomButton;
