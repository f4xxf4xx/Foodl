import { createReducer } from "@reduxjs/toolkit";
import { Recipe, Step } from "../../modules/Recipes/models";

export interface RecipeState {
  recipe: Recipe;
  ingredients: string[];
  steps: Step[];
  loadingRecipe: boolean;
  updatingRecipe: boolean;
  loadingIngredients: boolean;
  updatingIngredients: boolean;
  loadingSteps: boolean;
  updatingSteps: boolean;
}

const initialRecipeState: RecipeState = {
  recipe: null,
  ingredients: [],
  steps: [],
  loadingRecipe: false,
  updatingRecipe: false,
  loadingIngredients: false,
  updatingIngredients: false,
  loadingSteps: false,
  updatingSteps: false,
};

export const recipeReducer = createReducer(initialRecipeState, {
  FETCH_RECIPE_START: (state) => {
    state.loadingRecipe = true;
  },
  FETCH_RECIPE_STOP: (state) => {
    state.loadingRecipe = false;
  },
  UPDATE_RECIPE_START: (state) => {
    state.updatingRecipe = true;
  },
  UPDATE_RECIPE_STOP: (state) => {
    state.updatingRecipe = false;
  },
  FETCH_INGREDIENTITEMS_START: (state) => {
    state.loadingIngredients = true;
  },
  FETCH_INGREDIENTITEMS_STOP: (state) => {
    state.loadingIngredients = false;
  },
  UPDATE_INGREDIENTITEMS_START: (state) => {
    state.updatingIngredients = true;
  },
  UPDATE_INGREDIENTITEMS_STOP: (state) => {
    state.updatingIngredients = false;
  },
  FETCH_STEPS_START: (state) => {
    state.loadingSteps = true;
  },
  FETCH_STEPS_STOP: (state) => {
    state.loadingSteps = false;
  },
  UPDATE_STEPS_START: (state) => {
    state.updatingSteps = true;
  },
  UPDATE_STEPS_STOP: (state) => {
    state.updatingSteps = false;
  },
  UPDATE_RECIPE: (state, action) => {
    state.recipe = action.payload;
  },
  UPDATE_INGREDIENTITEMS: (state, action) => {
    state.ingredients = action.payload;
  },
  UPDATE_STEPS: (state, action) => {
    state.steps = action.payload;
  },
  UPDATE_STEP: (state, action) => {
    state.steps = state.steps.map((item) => {
      if (item.id === action.payload.id) {
        return action.payload;
      }
      return item;
    });
  },
  ADD_INGREDIENTITEM: (state, action) => {
    state.ingredients.push(action.payload);
  },
  ADD_STEP: (state, action) => {
    state.steps.push(action.payload);
  },
  DELETE_INGREDIENTITEM: (state, action) => {
    state.ingredients = state.ingredients.filter((i) => i !== action.payload);
  },
  DELETE_STEP: (state, action) => {
    state.steps = state.steps.filter((i) => i.id !== action.payload);
  },
});
