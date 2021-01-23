import { createReducer } from "@reduxjs/toolkit";

export interface RecipeState {
  isLoading: boolean;
  isUpdating: boolean;
}

const initialRecipeState: RecipeState = {
  isLoading: false,
  isUpdating: false,
};

export const recipeReducer = createReducer(initialRecipeState, {
  SET_RECIPE_LOADING: (state, action) => {
    state.isLoading = action.payload;
  },
  SET_RECIPE_UPDATING: (state, action) => {
    state.isUpdating = action.payload;
  },
});
