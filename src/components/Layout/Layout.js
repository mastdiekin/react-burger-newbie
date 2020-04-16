import React from "react";
import Aux from "../../hoc/Auxx";
import classes from "../Layout/Layout.sass";

const layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.content}>{props.children}</main>
  </Aux>
);

export default layout;
