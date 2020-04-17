import React from "react";
import classes from "./Modal.sass";

const modal = (props) => <div className={classes.Modal}>{props.children}</div>;

export default modal;
