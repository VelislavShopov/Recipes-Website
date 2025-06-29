import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user-slice";
import { recipesSlice } from "./recipes-slice";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    recipes: recipesSlice.reducer,
  },
});
