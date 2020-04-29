import React, { Component } from "react";
import Aux from "../../../hoc/Auxx/Auxx";
import Burger from "../../Burger/Burger";
import BuildControls from "../../../components/Burger/BuildControls/BuildControls";
import Basket from "../../UI/Basket/Basket";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class BurgerBuilder extends Component {
  //   constructor(props) {
  //     super(props);
  //   }

  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get("https://react-burger-94deb.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  purchasingHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // this.setState({
    //   loading: true,
    // });
    // const order = {
    //   ingredients: this.props.ings,
    //   price: this.props.price,
    //   customer: {
    //     name: "Dmitriy",
    //     address: {
    //       street: "yo",
    //       country: "Russia",
    //     },
    //     email: "mastdiekin@gmail.com",
    //     deliveryMethod: "faster than light",
    //   },
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false,
    //     });
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false,
    //     });
    //     console.log(error);
    //   });
    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i])
      );
    }
    queryParams.push("price=" + this.props.price);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ошибка, ингридиенты не могут быть загружены</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchasable={this.updatePurchaseState(this.props.ings)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
          type="modal"
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {/* <Basket purchasable={this.state.purchasable}>
          <OrderSummary
            ingredients={this.props.ings}
            purchasable={this.state.purchasable}
            type="cart"
          />
        </Basket> */}
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actions.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName: ingName }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
