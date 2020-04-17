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
      <h3>Your order</h3>
      <p>A delicious burger with...</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
    </Aux>
  );
  if (props.purchasable) {
    return r;
  } else {
    return null;
  }
};

export default orderSummary;
