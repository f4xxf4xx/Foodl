import { createAction } from "@reduxjs/toolkit";
import { Recipe, Step, IngredientGroup } from "../../modules/Recipes/models";
import { toast } from "react-toastify";
import { RecipeDbHelper } from "../../repositories/RecipeDbHelper";
import { StorageHelper } from "../../repositories/StorageHelper";

export const setRecipeLoading = createAction<boolean>("SET_RECIPE_LOADING");
export const setRecipeUpdating = createAction<boolean>("SET_RECIPE_UPDATING");
export const updateRecipe = createAction<Recipe>("UPDATE_RECIPE");

export const setIngredientGroupsLoading = createAction<boolean>(
  "SET_INGREDIENT_GROUPS_LOADING"
);
export const setIngredientGroupsUpdating = createAction<boolean>(
  "SET_INGREDIENT_GROUPS_UPDATING"
);
export const updateIngredientGroups = createAction<IngredientGroup[]>(
  "UPDATE_INGREDIENT_GROUPS"
);
export const updateIngredientGroup = createAction<IngredientGroup>(
  "UPDATE_INGREDIENT_GROUP"
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

export const updateRecipeAsync = (
  recipe: Recipe,
  key: string,
  value: string
) => {
  return async (dispatch) => {
    try {
      await RecipeDbHelper.updateRecipe(recipe.id, key, value);
      dispatch(updateRecipe({ ...recipe, [key]: value }));
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
};

export const addTagAsync = (recipe: Recipe, tag: string) => {
  return async (dispatch) => {
    try {
      const tags = await RecipeDbHelper.addTag(recipe.id, tag);
      dispatch(updateRecipe({ ...recipe, tags }));
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
};

export const addIngredientAsync = (recipe: Recipe, ingredient: string) => {
  return async (dispatch) => {
    dispatch(setIngredientGroupsUpdating(true));
    try {
      const success = await RecipeDbHelper.addIngredient(recipe.id, ingredient);
      if (success) {
        const ingredients = Object.assign([], recipe.ingredients);
        ingredients.push(ingredient);
        dispatch(updateRecipe({ ...recipe, ingredients }));
      } else {
        toast.warn("Ingredient already exists!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      dispatch(setIngredientGroupsUpdating(false));
    }
  };
};

export const deleteIngredientAsync = (recipe: Recipe, ingredient: string) => {
  return async (dispatch) => {
    dispatch(setIngredientGroupsUpdating(true));
    try {
      const ingredients = await RecipeDbHelper.deleteIngredient(
        recipe.id,
        ingredient
      );
      dispatch(updateRecipe({ ...recipe, ingredients }));
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      dispatch(setIngredientGroupsUpdating(false));
    }
  };
};

export const deleteIngredientGroupItemAsync = (
  recipe: Recipe,
  ingredientGroup: IngredientGroup,
  ingredient: string
) => {
  return async (dispatch) => {
    dispatch(setIngredientGroupsUpdating(true));
    try {
      const items = await RecipeDbHelper.deleteIngredientGroupItem(
        recipe.id,
        ingredientGroup.id,
        ingredient
      );
      dispatch(updateIngredientGroup({ ...ingredientGroup, items }));
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      dispatch(setIngredientGroupsUpdating(false));
    }
  };
};

export const addIngredientGroupItemAsync = (
  recipe: Recipe,
  ingredientGroup: IngredientGroup,
  ingredient: string
) => {
  return async (dispatch) => {
    dispatch(setIngredientGroupsUpdating(true));
    try {
      const items = await RecipeDbHelper.addIngredientGroupItem(
        recipe.id,
        ingredientGroup.id,
        ingredient
      );
      dispatch(updateIngredientGroup({ ...ingredientGroup, items }));
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      dispatch(setIngredientGroupsUpdating(false));
    }
  };
};

export const deleteTagAsync = (recipe: Recipe, tag: string) => {
  return async (dispatch) => {
    try {
      const tags = await RecipeDbHelper.deleteTag(recipe.id, tag);
      dispatch(updateRecipe({ ...recipe, tags }));
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
};

export const updateImageAsync = (recipe: Recipe, image: any) => {
  return async (dispatch) => {
    try {
      const filePath = await StorageHelper.addFileAsync(
        `recipes/${image.name}`,
        image
      );
      await RecipeDbHelper.updateRecipe(recipe.id, "imageFullPath", filePath);
      dispatch(updateRecipe({ ...recipe, imageFullPath: filePath }));
      toast.success("Updated!");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
};

export const fetchIngredientGroupsAsync = (id: string) => {
  return async (dispatch) => {
    dispatch(setIngredientGroupsLoading(true));
    try {
      const ingredientGroups = await RecipeDbHelper.getIngredientGroups(id);
      dispatch(updateIngredientGroups(ingredientGroups));
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setIngredientGroupsLoading(false));
    }
  };
};

export const addIngredientGroupAsync = (recipe: Recipe, groupId: string) => {
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
