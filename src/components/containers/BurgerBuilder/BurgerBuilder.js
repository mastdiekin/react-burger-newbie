import React, { Component } from "react";
import Aux from "../../../hoc/Auxx/Auxx";
import Burger from "../../Burger/Burger";
import BuildControls from "../../../components/Burger/BuildControls/BuildControls";
import Basket from "../../UI/Basket/Basket";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../../axios-orders";

import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

class BurgerBuilder extends Component {
  //   constructor(props) {
  //     super(props);
  //   }

  state = {
    purchasing: false,
    // loading: false,
    // error: false,
  };

  componentDidMount() {
    this.props.oninitIngredients();
  }

  purchasingHandler = () => {
    if (this.props.token) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
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
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    let orderSummary = null;
    let burger = this.props.error ? (
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
            isAuth={this.props.token}
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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    token: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    oninitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
