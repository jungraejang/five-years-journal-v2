import api from "./api";
import TokenService from "./token.service";

//export it later to env variables
const API_URL = "http://localhost:8080/api/auth/";

const register = async ({ username, email, password, roles }) => {
  try {
    let res = await api.post(API_URL + "signup", {
      username,
      email,
      password,
      roles,
    });
    return res;
  } catch (e) {
    let errorMessage = e.response.data.message;
    return Promise.reject(new Error(errorMessage));
  }
};

const login = async ({ username, password }) => {
  try {
    let res = await api.post(API_URL + "signin", {
      username,
      password,
    });
    if (res.data?.accessToken) {
      await TokenService.setUser(res.data);
    }
    return res.data;
  } catch (e) {
    let errorMessage = e.response.data.message;
    return Promise.reject(new Error(errorMessage));
  }
};

const logout = async () => {
  await TokenService.removeUser();
};

export default {
  register,
  login,
  logout,
};
