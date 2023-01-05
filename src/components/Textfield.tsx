import React, {DetailedHTMLProps} from "react";
import clsx from "clsx";

import classes from "./Textfield.css";
import {CustomFC} from "types/CustomFC";

interface TextfieldProps extends DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement>{}

const Textfield: CustomFC<TextfieldProps> = ({className, ...rest}) => (
  <input className={clsx(className, classes.textfield)} {...rest} />
)

export default Textfield;