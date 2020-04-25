import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./components/containers/Checkout/Checkout";

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
        <Checkout />
      </Layout>
    );
  }
}

export default App;
