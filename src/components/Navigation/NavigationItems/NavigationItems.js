import React from "react";
import classes from "./NavigationItems.sass";
import NavigationItem from "./NavigationItem/NavigationItem";
import Auxx from "../../../hoc/Auxx/Auxx";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link="/">
      Burger Builder
    </NavigationItem>

    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Auth</NavigationItem>
    ) : (
      <Auxx>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Auxx>
    )}
  </ul>
);

export default navigationItems;
