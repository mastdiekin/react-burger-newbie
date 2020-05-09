import * as actions from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
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
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};