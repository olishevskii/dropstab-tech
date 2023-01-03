import React from "react";
import clsx from "clsx";

import classes from "./Button.css";
import {CustomFC} from "../types/CustomFC";

export interface ButtonProps {
  children: string;
}

const Button: CustomFC<ButtonProps> = ({className, children}) => (
  <button className={clsx(className, classes.button)}>{children}</button>
);

export default Button;