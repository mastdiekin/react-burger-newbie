import React from "react";
import blogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.sass";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={blogo} alt="Logo" />
  </div>
);

export default logo;
