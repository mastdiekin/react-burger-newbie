import React, { Component } from "react";
import Aux from "../../hoc/Auxx";
import classes from "../Layout/Layout.sass";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  sideDrawerToggledHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !this.state.showSideDrawer,
      };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          open={this.state.showSideDrawer}
          toggled={this.sideDrawerToggledHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
