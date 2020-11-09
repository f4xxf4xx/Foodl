import { createReducer } from "@reduxjs/toolkit";
import { Recipe, Step, IngredientGroup } from "modules/Recipes/models";

export interface RecipeState {
  recipe: Recipe;
  ingredientGroups: IngredientGroup[];
  steps: Step[];
  loadingRecipe: boolean;
  updatingRecipe: boolean;
  loadingIngredientGroups: boolean;
  updatingIngredientGroups: boolean;
  loadingSteps: boolean;
  updatingSteps: boolean;
}

const initialRecipeState: RecipeState = {
  recipe: null,
  ingredientGroups: [],
  steps: [],
  loadingRecipe: false,
  updatingRecipe: false,
  loadingIngredientGroups: false,
  updatingIngredientGroups: false,
  loadingSteps: false,
  updatingSteps: false,
};

export const recipeReducer = createReducer(initialRecipeState, {
  SET_RECIPE_LOADING: (state, action) => {
    state.loadingRecipe = action.payload;
  },
  SET_RECIPE_UPDATING: (state, action) => {
    state.updatingRecipe = action.payload;
  },
  UPDATE_RECIPE: (state, action) => {
    state.recipe = action.payload;
  },
  SET_INGREDIENT_GROUPS_LOADING: (state, action) => {
    state.loadingIngredientGroups = action.payload;
  },
  SET_INGREDIENT_GROUPS_UPDATING: (state, action) => {
    state.updatingIngredientGroups = action.payload;
  },
  UPDATE_INGREDIENT_GROUPS: (state, action) => {
    state.ingredientGroups = action.payload;
  },
  UPDATE_INGREDIENT_GROUP: (state, action) => {
    console.log(action.payload);
    const ingredientGroup = state.ingredientGroups.find(
      (ingredientGroup) => ingredientGroup.id === action.payload.id
    );
    ingredientGroup.items = action.payload.items;
  },

  SET_STEPS_LOADING: (state, action) => {
    state.loadingSteps = action.payload;
  },
  SET_STEPS_UPDATING: (state, action) => {
    state.updatingSteps = action.payload;
  },
  UPDATE_STEPS: (state, action) => {
    state.steps = action.payload;
  },
});
