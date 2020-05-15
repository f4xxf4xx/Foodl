import { toast } from "react-toastify";
import { RecipeDbHelper } from "../repositories/RecipeDbHelper";
import { Filters } from "../store/recipes/recipesReducer";
import {
  updateRecipes,
  fetchRecipesStart,
  fetchRecipesStop,
  deleteRecipe,
  updateRecipesStop,
  updateRecipesStart,
  addRecipe,
} from "../store/recipes/recipesActions";
import {
  updateRecipeStart,
  updateRecipeStop,
  updateRecipe,
  updateIngredientsStart,
  updateIngredientsStop,
  addIngredient,
  updateStepsStart,
  updateStepsStop,
  addStep,
} from "../store/recipes/recipeActions";
import { Recipe, Step } from "../modules/Recipes/models";
import { History } from "history";

export const fetchAsync = (uid: string, filters: Filters) => {
  return async (dispatch) => {
    dispatch(fetchRecipesStart());
    try {
      const recipes = await RecipeDbHelper.getRecipes(uid, filters);
      dispatch(updateRecipes(recipes));
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(fetchRecipesStop());
    }
  };
};

export const deleteAsync = (recipeId: string) => {
  return async (dispatch) => {
    dispatch(updateRecipeStart());
    try {
      await RecipeDbHelper.deleteRecipe(recipeId);
      dispatch(deleteRecipe(recipeId));
      toast.success("Deleted recipe!");
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(updateRecipeStop());
    }
  };
};

export const addIngredientGroupAsync = (recipe: Recipe, group: string) => {
  return async (dispatch) => {
    dispatch(updateRecipeStart());
    try {
      const groups = await RecipeDbHelper.addIngredientGroup(recipe.id, group);
      if (groups) {
        dispatch(updateRecipe({ ...recipe, ingredientGroups: groups }));
      }
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(updateRecipeStop());
    }
  };
};

export const addIngredientAsync = (recipe: Recipe, ingredient: string) => {
  return async (dispatch) => {
    dispatch(updateIngredientsStart());
    try {
      const newIngredient = await RecipeDbHelper.addIngredient(
        recipe.id,
        ingredient
      );
      dispatch(addIngredient(newIngredient));
      toast.success("Added!");
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(updateIngredientsStop());
    }
  };
};

export const addRecipeAsync = (name: string, uid: string, history: History) => {
  return async (dispatch) => {
    dispatch(updateRecipesStart());
    try {
      const recipe = await RecipeDbHelper.addRecipe(name, uid);
      dispatch(addRecipe(recipe));
      toast.success("Added!");
      history.push(`/recipe/${recipe.slug}`);
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(updateRecipesStop());
    }
  };
};

export const addStepAsync = (id: string, newStep: Step) => {
  return async (dispatch) => {
    dispatch(updateStepsStart());
    try {
      const step = await RecipeDbHelper.addStep(id, newStep);
      dispatch(addStep(step));
      toast.success("Added!");
    } catch (error) {
      toast.error("Error adding the step item!");
    } finally {
      dispatch(updateStepsStop());
    }
  };
};
