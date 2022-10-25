import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carouselIndex: 0,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeIndex: (state, action) => {
      state.carouselIndex = action.payload;
    },
  },
});

export const { setThemeIndex } = themeSlice.actions;

export const selectCarouselIndex = (state) => state.theme.carouselIndex;

export default themeSlice.reducer;
