import { toast } from "react-toastify";
import { RecipeDbHelper } from "../repositories/RecipeDbHelper";
import { Filters } from "../store/recipes/recipesReducer";
import { updateRecipes, fetchRecipesStart, fetchRecipesStop, deleteRecipe } from "../store/recipes/recipesActions";
import { updateRecipeStart, updateRecipeStop } from "../store/recipes/recipeActions";

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