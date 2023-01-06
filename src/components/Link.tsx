import React, { DetailedHTMLProps } from "react";
import clsx from "clsx";

import { CustomFC } from "types/CustomFC";
import classes from "./Link.css";

export interface LinkProps
  extends DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const Link: CustomFC<LinkProps> = function ({ className, children, ...rest }) {
  return (
    <a className={clsx(className, classes.link)} {...rest}>
      {children}
    </a>
  );
};

export default Link;
