import React from "react";
import clsx from "clsx";

// TODO: add absolute path for types
import {CustomFC} from "../types/CustomFC";
import classes from "./GraphToolbar.css";
import Button from "./Button";

const GraphToolbar: CustomFC<{}> = ({className}) => (
  <form className={clsx(className, classes.graphToolbar)}>
    <div className={classes.buttons}>
      <Button className={classes.button}>Day</Button>
      <Button className={classes.button}>3 Days</Button>
      <Button className={classes.button}>Week</Button>
      <Button className={classes.button}>Month</Button>
    </div>
    <Button className={classes.button}>Refresh</Button>
  </form>
);

export default GraphToolbar;