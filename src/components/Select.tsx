import React, {useMemo} from "react";
import clsx from "clsx";

import classes from "./Select.css";
import {CustomFC} from "../types/CustomFC";

export interface Option {
  description: string;
  value: string;
}

export interface SelectProps {
  options: Option[];
}

const Select: CustomFC<SelectProps> = ({className, options}) => {
  const optionElements = useMemo(() => options.map(
    option => <option key={option.description} value={option.value}>{option.description}</option>
  ), []);

  return (
    <select className={clsx(className, classes.select)}>
      {optionElements}
    </select>
  );
}

export default Select;