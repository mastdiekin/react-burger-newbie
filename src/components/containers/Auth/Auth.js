import React, { Component } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import classes from "./Auth.sass";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import Auxx from "../../../hoc/Auxx/Auxx";
import { checkValid } from "../../../hoc/shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    inSignup: true,
  };

  componentDidMount = () => {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        inSignup: !prevState.inSignup,
      };
    });
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValid(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.inSignup
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const inputs = formElementsArray.map((el) => (
      <Input
        key={el.id}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        invalid={!el.config.valid}
        shouldValidate={el.config.validation}
        value={el.config.value}
        touched={el.config.touched}
        changed={(event) => this.inputChangedHandler(event, el.id)}
      />
    ));

    let form = this.props.loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.submitHandler}>
        {inputs}
        <Button btnType="Success">Submit</Button>
      </form>
    );

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    let wholeForm;
    if (this.props.token) {
      wholeForm = <Redirect to={this.props.authRedirectPath} />;
    } else {
      wholeForm = (
        <Auxx>
          {form}
          {errorMessage}
          <Button clicked={this.switchAuthModeHandler} btnType="Danger">
            Switch to {this.state.inSignup ? "SIGNIN" : "SIGNUP"}
          </Button>
        </Auxx>
      );
    }
    return <div className={classes.Auth}>{wholeForm}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
