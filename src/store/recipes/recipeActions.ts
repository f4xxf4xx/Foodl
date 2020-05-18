import { createAction } from "@reduxjs/toolkit";
import { Recipe, Step } from "../../modules/Recipes/models";
import { toast } from "react-toastify";
import { RecipeDbHelper } from "../../repositories/RecipeDbHelper";

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

export const fetchRecipeBySlugAsync = (uid: string, slug: string) => {
  return async (dispatch) => {
    dispatch(setRecipeLoading(true));
    try {
      const recipe = await RecipeDbHelper.getRecipeBySlug(uid, slug);
      dispatch(updateRecipe(recipe));
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setRecipeLoading(false));
    }
  };
};

export const fetchIngredientGroupsAsync = (uid: string, slug: string) => {
  return async (dispatch) => {
    dispatch(setRecipeLoading(true));
    try {
      const recipe = await RecipeDbHelper.getRecipeBySlug(uid, slug);
      dispatch(updateRecipe(recipe));
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setRecipeLoading(false));
    }
  };
};

export const addIngredientGroupAsync = (recipe: Recipe, group: string) => {
  return async (dispatch) => {
    dispatch(setRecipeUpdating(true));
    try {
      //const groups = await RecipeDbHelper.addIngredientGroup(recipe.id, group);
      //if (groups) {
      //  dispatch(updateRecipe({ ...recipe, ingredientGroups: groups }));
      //}
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setRecipeUpdating(false));
    }
  };
};

export const addStepAsync = (id: string, newStep: Step) => {
  return async (dispatch) => {
    dispatch(setRecipeUpdating(true));
    try {
      //const step = await RecipeDbHelper.addStep(id, newStep);
      //dispatch(addStep(step));
      toast.success("Added!");
    } catch (error) {
      toast.error("Error adding the step item!");
    } finally {
      dispatch(setRecipeUpdating(false));
    }
  };
};
