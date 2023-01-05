import React, {DetailedHTMLProps} from "react";
import clsx from "clsx";

import classes from "./Button.css";
import {CustomFC} from "types/CustomFC";

export interface ButtonProps extends DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement>{}

const Button: CustomFC<ButtonProps> = ({className, children, ...rest}) => (
  <button className={clsx(className, classes.button)} {...rest}>{children}</button>
);

export default Button;