import React, { Component } from "react";
import Button from "../../../../components/UI/Button/Button";
import classes from "./ContactData.sass";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>
          Enter your Contact data
          <form>
            <input type="text" name="name" placeholder="Your Name" />
            <input type="text" name="email" placeholder="Your Email" />
            <input type="text" name="street" placeholder="Street" />
            <input type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success">Order</Button>
          </form>
        </h4>
      </div>
    );
  }
}

export default ContactData;
