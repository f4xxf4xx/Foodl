import { createReducer } from "redux-starter-kit";
import { Ingredient } from "../../modules/Ingredients/models";

export interface IngredientState {
    ingredients: Ingredient[];
    loading: boolean;
    updating: boolean;
    newIngredient: any;
}

const initialState: IngredientState = {
    ingredients: [],
    loading: false,
    updating: false,
    newIngredient: null
};

export const ingredientReducer = createReducer(initialState, {
    SET_INGREDIENTS_LOADING: (state, action) => {
        state.loading = action.payload;
    },
    SET_INGREDIENTS_UPDATING: (state, action) => {
        state.loading = action.payload;
    },
    UPDATE_INGREDIENTS: (state, action) => {
        state.ingredients = action.payload;
    },
    ADD_INGREDIENT: (state, action) => {
        state.ingredients.push(action.payload);
        state.ingredients = state.ingredients.sort((a,b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
    },
    DELETE_INGREDIENT: (state, action) => {
        state.ingredients = state.ingredients.filter((i) => i.id !== action.payload);
    },
    UPDATE_NEW_INGREDIENT: (state, action) => {
        state.newIngredient = action.payload;
    }
});
