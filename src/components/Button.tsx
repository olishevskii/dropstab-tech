import React, {FC} from "react";

import classes from "./Button.css";

const Button: FC<{children: string}> = ({children}) => (
  <button className={classes.button}>{children}</button>
);

export default Button;