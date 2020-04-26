import React, { Component } from "react";
import Button from "../../../../components/UI/Button/Button";
import classes from "./ContactData.sass";
import axios from "../../../../axios-orders";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      deliveryMethod: "faster than light",
      customer: {
        name: "Dmitriy",
        address: {
          street: "yo",
          country: "Russia",
        },
        email: "mastdiekin@gmail.com",
      },
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
        console.log(response);
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.log(error);
      });
  };

  render() {
    let form = (
      <form>
        <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <Input
          inputtype="input"
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Street"
        />
        <Input
          inputtype="input"
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>
          Enter your Contact data
          {form}
        </h4>
      </div>
    );
  }
}

export default ContactData;
