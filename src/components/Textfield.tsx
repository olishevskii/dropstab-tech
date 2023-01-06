import React, { DetailedHTMLProps } from "react";
import clsx from "clsx";

import { CustomFC } from "types/CustomFC";
import classes from "./Textfield.css";

interface TextfieldProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Textfield: CustomFC<TextfieldProps> = function ({ className, ...rest }) {
  return <input className={clsx(className, classes.textfield)} {...rest} />;
};

export default Textfield;
