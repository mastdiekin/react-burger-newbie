import React from "react";
import Aux from "../../../hoc/Auxx";

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
          <p>Continue to checkout?</p>
          <button>Cancel</button>
          <button>Continue</button>
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
