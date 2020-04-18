import React from "react";
import Aux from "../../../hoc/Auxx";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span
          style={{
            textTransform: "capitalize",
          }}
        >
          {igKey}
        </span>
        :{props.ingredients[igKey]}
      </li>
    );
  });
  const r = (
    <Aux>
      <h3>{props.type === "modal" ? "Your order" : "Cart"}</h3>
      <p>A delicious burger with...</p>
      <ul>{ingredientSummary}</ul>
      {props.type === "modal" ? (
        <div className="checkout">
          <p>
            <strong>Total Price: {props.price.toFixed(2)}$</strong>
          </p>
          <p>Continue to checkout?</p>
          <Button clicked={props.purchaseCancelled} btnType="Danger">
            Cancel
          </Button>
          <Button clicked={props.purchaseContinued} btnType="Success">
            Continue
          </Button>
        </div>
      ) : null}
    </Aux>
  );
  if (props.purchasable) {
    return r;
  } else {
    return null;
  }
};

export default orderSummary;
