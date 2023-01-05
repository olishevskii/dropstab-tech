import React, {HTMLAttributes} from "react";
import clsx from "clsx";

import classes from "./Progress.css";
import {CustomFC} from "types/CustomFC";

export enum ProgressColor {
  REGULAR = "regular",
  SECONDARY = "secondary",
}

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  color?: "regular" | "secondary";
}

const Progress: CustomFC<ProgressProps> = ({className, color = ProgressColor.REGULAR}) => {
  const isSecondaryColor = color === ProgressColor.SECONDARY;
  return <div className={clsx(
    className,
    classes.progress,
    isSecondaryColor && classes.secondary
  )} />;
}

export default Progress;