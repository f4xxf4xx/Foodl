import { IngredientService } from "../../services/IngredientService";
import { toast } from "react-toastify";

export const setIngredientsLoading = loading => ({
    type: "SET_INGREDIENTS_LOADING",
    payload: loading
});

export const setIngredientsUpdating = updating => ({
    type: "SET_INGREDIENTS_UPDATING",
    payload: updating
});

export const updateIngredients = ingredients => ({
    type: "UPDATE_INGREDIENTS",
    payload: ingredients
});

export const addIngredient = ingredient => ({
    type: "ADD_INGREDIENT",
    payload: ingredient
});

export const deleteIngredient = ingredientId => ({
    type: "DELETE_INGREDIENT",
    payload: ingredientId
});

export const fetchAsync = () => {
    return async dispatch => {
        dispatch(setIngredientsLoading(true));
        try {
            const response = await IngredientService.getIngredients();
            dispatch(updateIngredients(response));
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
            const response = await IngredientService.addIngredient(label);
            dispatch(addIngredient(response));
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(setIngredientsUpdating(false));
        }
    }    
}