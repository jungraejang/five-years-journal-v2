import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "./api";
import TokenService from "./token.service";

const API_URL = "http://localhost:8080/api/auth/";

const register = ({ username, email, password, roles }) => {
  return api.post(API_URL + "signup", {
    username,
    email,
    password,
    roles,
  });
};

const login = async ({ username, password }) => {
  return api
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data?.accessToken) {
        TokenService.setUser(response.data);
      }

      return response.data;
    })
    .catch((e) => {
      let errorMessage = e.response.data.message;
      return Promise.reject(new Error(errorMessage));
    });
};

const logout = async () => {
  TokenService.removeUser();
};

export default {
  register,
  login,
  logout,
};
