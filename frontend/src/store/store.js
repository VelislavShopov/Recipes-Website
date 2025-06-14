import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user-slice";
import { newestRecipesSlice } from "./newest-recipes-slice";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    newestRecipes: newestRecipesSlice.reducer,
  },
});
