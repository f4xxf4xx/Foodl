import { createReducer } from "redux-starter-kit";
import { Recipe } from "./models";

export type RecipesState = {
    recipes: Recipe[];
    loading: boolean;
    updating: boolean;
}

const initialState: RecipesState = {
    recipes: [],
    loading: false,
    updating: false
}

export const recipesReducer = createReducer(initialState, {
    FETCH_RECIPES_START: (state) => {
        state.loading = true;
    },
    FETCH_RECIPES_STOP: (state) => {
        state.loading = false;
    },
    UPDATE_RECIPES_START: (state) => {
        state.updating = false;
    },
    UPDATE_RECIPES_STOP: (state) => {
        state.updating = false;
    },
    UPDATE_RECIPES: (state, action) => {
        state.recipes = action.payload;
    },
    ADD_RECIPE: (state, action) => {
        state.recipes.push(action.payload);
    },
    DELETE_RECIPE: (state, action) => {
        state.recipes = state.recipes.filter(i => i.id !== action.payload);
    }
});