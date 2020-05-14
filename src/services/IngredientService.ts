import { IngredientDbHelper } from "../repositories/IngredientDbHelper";
import { toast } from "react-toastify";
import { setIngredientsLoading, updateIngredients, setIngredientsUpdating, addIngredient, deleteIngredient } from "../store/ingredients/ingredientActions";

export const fetchAsync = () => {
    return async dispatch => {
        dispatch(setIngredientsLoading(true));
        try {
            const ingredients = await IngredientDbHelper.getIngredients();
            dispatch(updateIngredients(ingredients));
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(setIngredientsLoading(false));
        }
    }    
}

export const addIngredientAsync = (label: string) => {
    return async dispatch => {
        dispatch(setIngredientsUpdating(true));
        try {
            const ingredient = await IngredientDbHelper.addIngredient(label);
            if(ingredient) {
                dispatch(addIngredient(ingredient));
                toast.success("Added!");
            }
            else {
                toast.warn("This ingredient already exists!");
            }
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(setIngredientsUpdating(false));
        }
    }    
}

export const deleteIngredientAsync = (id: string) => {
    return async dispatch => {
        dispatch(setIngredientsUpdating(true));
        try {
            await IngredientDbHelper.deleteIngredient(id);
            dispatch(deleteIngredient(id));
            toast.success("Deleted!");
        }
        catch(error) {
            toast.error(error);
        }
        finally {
            dispatch(setIngredientsUpdating(false));
        }
    }
}