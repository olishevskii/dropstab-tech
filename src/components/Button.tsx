import React, { DetailedHTMLProps } from "react";
import clsx from "clsx";

import { CustomFC } from "types/CustomFC";
import classes from "./Button.css";

export interface ButtonProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const Button: CustomFC<ButtonProps> = function ({
  className,
  children,
  ...rest
}) {
  return (
    <button className={clsx(className, classes.button)} type="button" {...rest}>
      {children}
    </button>
  );
};

export default Button;
