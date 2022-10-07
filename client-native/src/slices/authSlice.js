import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: "JRJ THE GREAT",
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserData, setIsLoggedIn } = authSlice.actions;

export const selectUserData = (state) => state.auth.userData;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
