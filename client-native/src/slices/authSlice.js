import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenService from "../services/token.service";

// const user = () => await JSON.parse(AsyncStorage.getItem("user"));
const getUserFromAsync = () => {
  AsyncStorage.getItem("user").then((data) => {
    let result = JSON.parse(data);
    console.log("result", result);
    return result;
  });
};
let user = getUserFromAsync();

console.log("user", user);
const initialState = user
  ? { isLoggedIn: true, user, message: "" }
  : { isLoggedIn: false, user: null, message: "" };

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password, roles }) => {
    const res = await authService.register({
      username,
      email,
      password,
      roles,
    });
    console.log("res", res);
    return res.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    // const res = await authService.login({
    //   username,
    //   password,
    // });
    // if (res.data.accessToken) {
    //   console.log("loginUser", res.data);
    //   TokenService.setUser(res.data);
    // }
    // console.log("res", res);
    // return res.data;
    return authService
      .login({
        username,
        password,
      })
      .then((res) => {
        console.log("loginUser", res);

        if (res.accessToken) {
          TokenService.setUser(res);
        }
        return res;
      })
      .catch((e) => {
        // console.error(e);
        return rejectWithValue(e);
      });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
    },
    refreshToken: (state, action) => {
      state.user.accessToken = action.payload;
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      // state.user = action.payload.message;
      // state.isLoggedIn = true;
      state.message = action.payload.message;
    },
    [loginUser.fulfilled]: (state, action) => {
      // state.user = action.payload.message;
      state.isLoggedIn = true;
      state.message = "User Logged In Successfully";
      state.user = action.payload;
    },
  },
});

export const {
  setUser,
  setIsLoggedIn,
  setMessage,
  clearMessage,
  refreshToken,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectMessage = (state) => state.message.message;

export default authSlice.reducer;
