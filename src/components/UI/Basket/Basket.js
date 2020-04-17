import React from "react";
import classes from "./Basket.sass";

const modal = (props) => {
  if (props.purchasable) {
    return <div className={classes.Basket}>{props.children}</div>;
  } else {
    return null;
  }
};

export default modal;
