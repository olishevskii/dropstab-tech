import React, {ButtonHTMLAttributes} from "react";
import clsx from "clsx";

import classes from "./Button.css";
import {CustomFC} from "types/CustomFC";

export interface ButtonProps extends ButtonHTMLAttributes<{}>{}

const Button: CustomFC<ButtonProps> = ({className, children, ...rest}) => (
  <button className={clsx(className, classes.button)} {...rest}>{children}</button>
);

export default Button;