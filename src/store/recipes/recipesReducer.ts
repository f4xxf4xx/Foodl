import { createReducer } from "@reduxjs/toolkit";
import { Recipe } from "modules/Recipes/models";

export interface Filters {
  type?: string;
  cuisine?: string;
}

export interface RecipesState {
  recipes: Recipe[];
  loading: boolean;
  updating: boolean;
  filters: Filters;
  newRecipe: Recipe;
}

const initialRecipesState: RecipesState = {
  recipes: [],
  loading: false,
  updating: false,
  filters: null,
  newRecipe: null,
};

export const recipesReducer = createReducer(initialRecipesState, {
  SET_RECIPES_LOADING: (state, action) => {
    state.loading = action.payload;
  },
  SET_RECIPES_UPDATING: (state, action) => {
    state.updating = action.payload;
  },
  UPDATE_RECIPES: (state, action) => {
    state.recipes = action.payload;
  },
  ADD_RECIPE: (state, action) => {
    state.recipes.push(action.payload);
  },
  DELETE_RECIPE: (state, action) => {
    state.recipes = state.recipes.filter((i) => i.id !== action.payload);
  },
  UPDATE_FILTERS: (state, action) => {
    state.filters = action.payload;
  },
  UPDATE_NEW_RECIPE: (state, action) => {
    state.newRecipe = action.payload;
  },
});
