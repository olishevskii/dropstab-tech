import React, {SelectHTMLAttributes, useMemo} from "react";
import clsx from "clsx";

import classes from "./Select.css";
import {CustomFC} from "types/CustomFC";

export interface Option {
  description: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<{}>{
  options: Option[];
}

const Select: CustomFC<SelectProps> = ({className, options, ...rest}) => {
  const optionElements = useMemo(() => options.map(
    option => <option key={option.description} value={option.value}>{option.description}</option>
  ), []);

  return (
    <select className={clsx(className, classes.select)} {...rest}>
      {optionElements}
    </select>
  );
}

export default Select;