import React, {InputHTMLAttributes} from "react";
import clsx from "clsx";

import classes from "./RadioButton.css";
import {CustomFC} from "../types/CustomFC";

export interface RadioButtonProps extends InputHTMLAttributes<{}>{}

const RadioButton: CustomFC<RadioButtonProps> = ({className, children, ...rest}) => (
  <label className={clsx(className, classes.radioButton, rest.checked && classes.checked)}>
    <input className={classes.input} {...rest} type="radio" />
    <div className={classes.button}>{children}</div>
  </label>
);

export default RadioButton;