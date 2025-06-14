import { createSlice } from "@reduxjs/toolkit";

export const newestRecipesSlice = createSlice({
  name: "newest-recipes",
  initialState: [],
  reducers: {
    setRecipes(state, action) {
      return action.payload;
    },
  },
});

export function setNewestRecipes(recipes) {
  return function (dispatch) {
    dispatch(newestRecipesSlice.actions.setRecipes(recipes));
  };
}
