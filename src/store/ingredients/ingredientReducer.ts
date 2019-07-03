import { createReducer } from "redux-starter-kit";
import { Ingredient } from "../../components/Ingredients/models";

export type IngredientState = {
    ingredients: Ingredient[];
    loadingIngredients: boolean;
    updatingIngredients: boolean;
}

const initialState: IngredientState = {
    ingredients: [],
    loadingIngredients: false,
    updatingIngredients: false
}

export const ingredientReducer = createReducer(initialState, {
    FETCH_INGREDIENTS_START: (state) => {
        state.loadingIngredients = true;
    },
    FETCH_INGREDIENTS_STOP: (state) => {
        state.loadingIngredients = false;
    },
    UPDATE_INGREDIENTS_START: (state) => {
        state.updatingIngredients = true;
    },
    UPDATE_INGREDIENTS_STOP: (state) => {
        state.updatingIngredients = false;
    },
    UPDATE_INGREDIENTS: (state, action) => {
        state.ingredients = action.payload;
    },
    ADD_INGREDIENT: (state, action) => {
        state.ingredients.push(action.payload);
    },
    DELETE_INGREDIENT: (state, action) => {
        state.ingredients = state.ingredients.filter(i => i.id !== action.payload);
    }
});