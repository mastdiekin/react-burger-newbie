import React from "react";
import Aux from "../../hoc/Auxx";
import classes from "../Layout/Layout.sass";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = (props) => (
  <Aux>
    <Toolbar />
    <main className={classes.content}>{props.children}</main>
  </Aux>
);

export default layout;
