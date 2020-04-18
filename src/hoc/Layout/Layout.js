import React, { Component } from "react";
import Aux from "../Auxx/Auxx";
import classes from "./Layout.sass";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
