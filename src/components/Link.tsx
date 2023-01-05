import React, {DetailedHTMLProps} from "react";
import clsx from "clsx";

import classes from "./Link.css";
import {CustomFC} from "types/CustomFC";

export interface LinkProps extends DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement>{}

const Link: CustomFC<LinkProps> = ({className, children, ...rest}) => (
  <a className={clsx(className, classes.link)} {...rest}>{children}</a>
);

export default Link;