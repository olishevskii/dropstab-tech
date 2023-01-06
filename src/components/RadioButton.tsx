import React, { DetailedHTMLProps } from "react";
import clsx from "clsx";

import { CustomFC } from "types/CustomFC";
import classes from "./RadioButton.css";

export interface RadioButtonProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const RadioButton: CustomFC<RadioButtonProps> = function ({
  className,
  children,
  ...rest
}) {
  return (
    <label
      className={clsx(
        className,
        classes.radioButton,
        rest.checked && classes.checked
      )}
      htmlFor={rest.id}
    >
      <input className={classes.input} {...rest} type="radio" />
      <span className={classes.button}>{children}</span>
    </label>
  );
};

export default RadioButton;
