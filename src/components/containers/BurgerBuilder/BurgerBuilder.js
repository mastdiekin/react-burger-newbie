import React, { Component } from "react";
import Aux from "../../../hoc/Auxx";
import Burger from "../../Burger/Burger";

class BurgerBuilder extends Component {
  //   constructor(props) {
  //     super(props);
  //   }

  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      meat: 2,
      cheese: 2,
      // salad: 0,
      // bacon: 0,
      // meat: 0,
      // cheese: 0,
    },
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
