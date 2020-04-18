import React from "react";
import classes from "./Toolbar.sass";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <button
      className={[classes.ToolbarToggle, classes.MobileOnly].join(" ")}
      onClick={props.toggled}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
