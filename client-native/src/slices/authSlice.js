import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import TokenService from "../services/token.service";

const initialState = { isLoggedIn: false, user: {}, message: "" };

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password, roles }, { rejectWithValue }) => {
    try {
      const res = await authService.register({
        username,
        email,
        password,
        roles,
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      let res = await authService.login({
        username,
        password,
      });
      if (res && res.accessToken) {
        TokenService.setUser(res);
      }
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
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
      state.message = action.payload ? "User Logged In" : "User Logged Out";
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
    setInit: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      // state.user = action.payload.message;
      // state.isLoggedIn = true;
      state.message = action.payload.message;
    },
    [registerUser.rejected]: (state, action) => {
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
    [loginUser.rejected]: (state, action) => {
      // state.user = action.payload.message;
      state.isLoggedIn = false;
      state.message = action.payload.message;
      // state.user = action.payload;
    },
  },
});

export const {
  setUser,
  setIsLoggedIn,
  setMessage,
  clearMessage,
  refreshToken,
  setInit,
  logout,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectMessage = (state) => state.auth.message;

export default authSlice.reducer;
