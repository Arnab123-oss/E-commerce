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
    localStorage.setItem( "authToken", data.token)
    console.log(data.token)
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
  } catch (error) {
    dispatch({ type: "registerFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${server}/me`,{headers:{authorization:localStorage.getItem("authToken")}});

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
    localStorage.removeItem('authToken');
  } catch (error) {
    dispatch({ type: "logOutFail", payload: error.response.data.message });
  }
};
