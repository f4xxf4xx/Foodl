import { toast } from "react-toastify";
import { RecipeDbHelper } from "../repositories/RecipeDbHelper";
import { Filters } from "../store/recipes/recipesReducer";
import {
  updateRecipes,
  setRecipesLoading,
  setRecipesUpdating,
  deleteRecipe,
  addRecipe,
} from "../store/recipes/recipesActions";
import {
  setRecipeLoading,
  setRecipeUpdating,
  updateRecipe,
  setIngredientGroupsUpdating,
} from "../store/recipes/recipeActions";
import { Recipe, Step } from "../modules/Recipes/models";
import { History } from "history";

export const fetchRecipesAsync = (uid: string, filters: Filters) => {
  return async (dispatch) => {
    dispatch(setRecipeLoading(true));
    try {
      const recipes = await RecipeDbHelper.getRecipes(uid, filters);
      dispatch(updateRecipes(recipes));
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setRecipeLoading(false));
    }
  };
};

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

export const deleteAsync = (recipeId: string) => {
  return async (dispatch) => {
    dispatch(setRecipeUpdating(true));
    try {
      await RecipeDbHelper.deleteRecipe(recipeId);
      dispatch(deleteRecipe(recipeId));
      toast.success("Deleted recipe!");
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setRecipeUpdating(false));
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

export const addRecipeAsync = (name: string, uid: string, history: History) => {
  return async (dispatch) => {
    dispatch(setRecipesUpdating(true));
    try {
      const recipe = await RecipeDbHelper.addRecipe(name, uid);
      dispatch(addRecipe(recipe));
      toast.success("Added!");
      history.push(`/recipe/${recipe.slug}`);
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setRecipesUpdating(false));
    }
  };
};

export const addStepAsync = (id: string, newStep: Step) => {
  return async (dispatch) => {
    dispatch(setRecipesUpdating(true));
    try {
      //const step = await RecipeDbHelper.addStep(id, newStep);
      //dispatch(addStep(step));
      toast.success("Added!");
    } catch (error) {
      toast.error("Error adding the step item!");
    } finally {
      dispatch(setRecipesUpdating(false));
    }
  };
};
