import * as actions from "./actionTypes";

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

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
  };
};
