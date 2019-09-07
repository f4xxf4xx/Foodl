import { createReducer } from "redux-starter-kit";
import { Ingredient } from "../../modules/Ingredients/models";

export interface IngredientState {
    ingredients: Ingredient[];
    loading: boolean;
    loadingIngredients: boolean;
    updating: boolean;
    updatingIngredients: boolean;
}

const initialState: IngredientState = {
    ingredients: [],
    loading: false,
    loadingIngredients: false,
    updating: false,
    updatingIngredients: false
};

export const ingredientReducer = createReducer(initialState, {
    SET_INGREDIENTS_LOADING: (state, action) => {
        state.loading = action.payload;
    },
    SET_INGREDIENTS_UPDATING: (state, action) => {
        state.loading = action.payload;
    },
    FETCH_INGREDIENTS_START: (state) => {
        state.loadingIngredients = true;
    },
    FETCH_INGREDIENTS_STOP: (state) => {
        state.loadingIngredients = false;
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
});
