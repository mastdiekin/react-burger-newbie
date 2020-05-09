import * as actions from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actions.AUTH_SUCCESS,
    authData,
  };
};

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecurityToken: true,
    };
    let key = "AIzaSyC_cXfPzHpXlztsKVXrka07iQb9nRgucF4";
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + key;
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        key;
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
