import { createReducer } from "@reduxjs/toolkit";
import { Recipe } from "modules/Recipes/models";

export interface Filters {
  type?: string;
  cuisine?: string;
}

export interface RecipesState {
  isLoading: boolean;
  isUpdating: boolean;
  filters: Filters;
  newRecipeId: string;
}

const initialRecipesState: RecipesState = {
  isLoading: false,
  isUpdating: false,
  filters: null,
  newRecipeId: "",
};

export const recipesReducer = createReducer(initialRecipesState, {
  SET_RECIPES_LOADING: (state, action) => {
    state.isLoading = action.payload;
  },
  SET_RECIPES_UPDATING: (state, action) => {
    state.isUpdating = action.payload;
  },
  UPDATE_FILTERS: (state, action) => {
    state.filters = action.payload;
  },
  UPDATE_NEW_RECIPE: (state, action) => {
    state.newRecipeId = action.payload;
  },
});
