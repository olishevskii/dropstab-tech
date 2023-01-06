import React, { DetailedHTMLProps, useMemo } from "react";
import clsx from "clsx";

import { CustomFC } from "types/CustomFC";
import classes from "./Select.css";

export interface Option {
  description: string;
  value: string;
}

export interface SelectProps
  extends DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: Option[];
}

const Select: CustomFC<SelectProps> = function ({
  className,
  options,
  ...rest
}) {
  const optionElements = useMemo(
    () =>
      options.map((option) => (
        <option key={option.description} value={option.value}>
          {option.description}
        </option>
      )),
    []
  );

  return (
    <select className={clsx(className, classes.select)} {...rest}>
      {optionElements}
    </select>
  );
};

export default Select;
