import React from "react";
import classes from "./Spinner.sass";

const spinner = (props) => (
  <div className={[classes.Spinner__container, classes.load].join(" ")}>
    <div className={classes.Spinner}></div>
  </div>
);

export default spinner;
