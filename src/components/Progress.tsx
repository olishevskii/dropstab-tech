import React, { DetailedHTMLProps } from "react";
import clsx from "clsx";

import { CustomFC } from "types/CustomFC";
import classes from "./Progress.css";

export enum ProgressColor {
  REGULAR = "regular",
  SECONDARY = "secondary",
}

export interface ProgressProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  color?: "regular" | "secondary";
}

const Progress: CustomFC<ProgressProps> = function ({
  className,
  color = ProgressColor.REGULAR,
  ...rest
}) {
  const isSecondaryColor = color === ProgressColor.SECONDARY;
  return (
    <div
      className={clsx(
        className,
        classes.progress,
        isSecondaryColor && classes.secondary
      )}
      {...rest}
    />
  );
};

export default Progress;
