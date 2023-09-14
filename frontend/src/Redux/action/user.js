import { server } from "../store";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      { headers: { "content-type": "application/json", withCredentials: true } }
    );
    localStorage.setItem("authToken", data.token);
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const register = (userdata) => async (dispatch) => {

  try {
    dispatch({ type: "registerRequest" });

    const { data } = await axios.post(`${server}/register`, userdata, {
      headers: { "content-type": "multipart/form-data", withCredentials: true },
    });
    dispatch({ type: "registerSuccess", payload: data });
    localStorage.setItem("authToken", data.token);
  } catch (error) {
    dispatch({ type: "registerFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${server}/me`, {
      headers: { authorization: localStorage.getItem("authToken") },
    });

    dispatch({ type: "loadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message });
  }
};
export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: "logOutRequest" });

    const { data } = await axios.get(`${server}/logout`);

    dispatch({ type: "logOutSuccess", payload: data.message });
    localStorage.removeItem("authToken");
  } catch (error) {
    dispatch({ type: "logOutFail", payload: error.response.data.message });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.put(`${server}/me/update`, userData, config);
    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.message,
    });
  }
};

export const changePassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
  console.log(oldPassword, newPassword, confirmPassword)
    try {
      dispatch({ type: "changePasswordRequest" });
      const config = {
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("authToken"),
        }
      };

      const { data } = await axios.put(
        `${server}/password/update`,
        { oldPassword, newPassword, confirmPassword },
        config
      );
      dispatch({ type: "changePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "changePasswordFail",
        payload: error.response.data.message,
      });
    }
  };

  export const forgetPassword = email => async dispatch => {
    try {
      dispatch({ type: 'forgetPasswordRequest' });
  
      const { data } = await axios.post(
        `${server}/password/forgot`,
        { email },
        { headers: { 'content-type': 'application/json' }, withCredentials: true }
      );
      dispatch({ type: 'forgetPasswordSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'updateProfilePictureFail',
        payload: error.response.data.message,
      });
    }
  };

  export const resetPassword = (token, password,confirmPassword) => async dispatch => {
    try {
      dispatch({ type: 'resetPasswordRequest' });
      const { data } = await axios.put(
        `${server}/password/reset/${token}`,
        { password ,confirmPassword},
        { headers: { 'content-type': 'application/json' }, withCredentials: true }
      );
      dispatch({ type: 'resetPasswordSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'resetPasswordFail',
        payload: error.response.data.message,
      });
    }
  };
