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
      console.log("login rs triggered", response);
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
        console.log("login rs triggered", response);
      }

      return response.data;
    })
    .catch((e) => {
      console.error(e);
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
