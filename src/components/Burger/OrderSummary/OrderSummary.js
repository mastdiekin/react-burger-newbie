import React, { Component } from "react";
import Aux from "../../../hoc/Auxx/Auxx";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // componentDidUpdate() {
  //   console.log(["OrderSummary DidUpdate"]);
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span
              style={{
                textTransform: "capitalize",
              }}
            >
              {igKey}
            </span>
            :{this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    const r = (
      <Aux>
        <h3>{this.props.type === "modal" ? "Your order" : "Cart"}</h3>
        <p>A delicious burger with...</p>
        <ul>{ingredientSummary}</ul>
        {this.props.type === "modal" ? (
          <div className="checkout">
            <p>
              <strong>Total Price: {this.props.price.toFixed(2)}$</strong>
            </p>
            <p>Continue to checkout?</p>
            <Button clicked={this.props.purchaseCancelled} btnType="Danger">
              Cancel
            </Button>
            <Button clicked={this.props.purchaseContinued} btnType="Success">
              Continue
            </Button>
          </div>
        ) : null}
      </Aux>
    );
    if (this.props.purchasable) {
      return r;
    } else {
      return null;
    }
  }
}

export default OrderSummary;
