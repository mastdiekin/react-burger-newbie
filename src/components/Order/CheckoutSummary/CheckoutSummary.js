import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.sass";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>lol</h1>
      <div
        style={{
          width: "100%",
          margin: "auto",
        }}
      >
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.onCheckoutCanceled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.onCheckoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
