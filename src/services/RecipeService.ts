import { toast } from "react-toastify";
import { RecipeDbHelper } from "../repositories/RecipeDbHelper";
import { Filters } from "../store/recipes/recipesReducer";
import { updateRecipes, fetchRecipesStart, fetchRecipesStop, deleteRecipe, updateRecipesStop, updateRecipesStart, addRecipe } from "../store/recipes/recipesActions";
import { updateRecipeStart, updateRecipeStop, updateRecipe, updateIngredientItemsStart, updateIngredientItemsStop, addIngredientItem } from "../store/recipes/recipeActions";
import { Recipe, IngredientItem } from "../modules/Recipes/models";

export const fetchAsync = (uid: string, filters: Filters) => {
    return async dispatch => {
        dispatch(fetchRecipesStart());
        try {
            const recipes = await RecipeDbHelper.getRecipes(uid, filters);
            dispatch(updateRecipes(recipes));
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(fetchRecipesStop());
        }
    }
}

export const deleteAsync = (recipeId: string) => {
    return async dispatch => {
        dispatch(updateRecipeStart());
        try {
            await RecipeDbHelper.deleteRecipe(recipeId);
            dispatch(deleteRecipe(recipeId));
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(updateRecipeStop());
        }
    }
}

export const addIngredientGroupAsync = (recipe: Recipe, group: string) => {
    return async dispatch => {
        dispatch(updateRecipeStart());
        try {
            const groups = await RecipeDbHelper.addIngredientGroup(recipe.id, group);
            if (groups) {
                dispatch(updateRecipe({ ...recipe, ingredientGroups: groups }));
            }
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(updateRecipeStop());
        }
    }
}

export const addIngredientItemAsync = (recipe: Recipe, ingredientItem: IngredientItem) => {
    return async dispatch => {
        dispatch(updateIngredientItemsStart());
        try {
            const newIngredientItem = await RecipeDbHelper.addIngredientItem(recipe.id, ingredientItem);
            dispatch(addIngredientItem(newIngredientItem));
            toast.success("Added!");
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(updateIngredientItemsStop());
        }
    }
}

export const addRecipeAsync = (name: string, uid: string) => {
    return async dispatch => {
        dispatch(updateRecipesStart());
        try {
            const recipe = await RecipeDbHelper.addRecipe(name, uid);
            dispatch(addRecipe(recipe));
            toast.success("Added!");
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(updateRecipesStop());
        }
    }
}