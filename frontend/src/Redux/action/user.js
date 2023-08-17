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
  console.log(userdata)
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
  console.log(userData)
  try {
    dispatch({ type: "updateProfileRequest" });

    const config = {
      headers: { "Content-Type": "multipart/form-data", authorization: localStorage.getItem("authToken"),},
};

    const { data } = await axios.put(`${server}/me/update`, userData, config);
     console.log(data);
    dispatch({ type: "updateProfileSuccess", payload: data.success });
  } catch (error) {
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.message,
    });
  }
};
