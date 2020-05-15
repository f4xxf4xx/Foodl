import { createAction } from "@reduxjs/toolkit";
import { Recipe } from "../../modules/Recipes/models";

export const setRecipeLoading = createAction<boolean>("SET_RECIPE_LOADING");
export const setRecipeUpdating = createAction<boolean>("SET_RECIPE_UPDATING");
export const updateRecipe = createAction<Recipe>("UPDATE_RECIPE");

export const setIngredientGroupsLoading = createAction<boolean>(
  "SET_INGREDIENT_GROUPS_LOADING"
);
export const setIngredientGroupsUpdating = createAction<boolean>(
  "SET_INGREDIENT_GROUPS_UPDATING"
);
export const updateIngredientGroups = createAction<string[]>(
  "UPDATE_INGREDIENT_GROUPS"
);

export const setStepsLoading = createAction<boolean>("SET_STEPS_LOADING");
export const setStepsUpdating = createAction<boolean>("SET_STEPS_UPDATING");
export const updateSteps = createAction<string[]>("UPDATE_STEPS");
export const addStep = createAction<string>("ADD_STEP");

interface UpdateStepPayload {
  id: string;
  text: string;
}
export const updateStep = createAction<UpdateStepPayload>("UPDATE_STEP");
export const deleteStep = createAction<string>("DELETE_STEP");
