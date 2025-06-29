import { createSlice } from "@reduxjs/toolkit";
import { getAllRecipes } from "../http requests/recipes";
import { act } from "react";

export const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    filters: {
      type_dish: null,
    },
    filteredRecipes: [],
  },
  reducers: {
    setRecipes(state, action) {
      state.recipes = action.payload;
      state.filteredRecipes = action.payload;
    },
    addFilter(state, action) {
      const type = action.payload.type;
      const value = action.payload.value;
      const currentValue = state.filters[type];
      if (currentValue === null) {
        state.filters = {
          ...state.filters,
          [type]: [value],
        };
      } else if (currentValue.includes(value)) {
        const newValue = currentValue.filter((v) => v !== value);
        state.filters = {
          ...state.filters,
          [type]: newValue,
        };
      } else {
        state.filters = {
          ...state.filters,
          [type]: [...currentValue, value],
        };
      }
    },
    filterRecipes(state, action) {
      console.log(state.filters.type_dish);

      if (state.filters.type_dish.length == 0) {
        state.filteredRecipes = state.recipes;
        return;
      }

      state.filteredRecipes = state.recipes.filter((r) => {
        console.log(r.type_dish);
        if (state.filters.type_dish.length > 0) {
          return state.filters.type_dish.includes(r.type_dish);
        }
      });
    },
  },
});

export function setInitialRecipes() {
  return async function (dispatch) {
    const recipes = await getAllRecipes();
    console.log(recipes);
    dispatch(recipesSlice.actions.setRecipes(recipes.data));
  };
}

export function addFilterRecipes(type, value) {
  return function (dispatch) {
    dispatch(recipesSlice.actions.addFilter({ type, value }));
    dispatch(recipesSlice.actions.filterRecipes());
  };
}
