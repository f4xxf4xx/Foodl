import { createReducer } from "redux-starter-kit";
import { Recipe } from "../../modules/Recipes/models";

export interface Filters {
    type?: string;
    cuisine?: string;
}

export interface RecipesState {
    recipes: Recipe[];
    loading: boolean;
    updating: boolean;
    filters: Filters;
    newRecipe: any;
}

const initialRecipesState: RecipesState = {
    recipes: [],
    loading: false,
    updating: false,
    filters: null,
    newRecipe: null
};

export const recipesReducer = createReducer(initialRecipesState, {
    FETCH_RECIPES_START: (state) => {
        state.loading = true;
        state.filters = null;
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
        state.recipes = state.recipes.filter((i) => i.id !== action.payload);
    },
    UPDATE_FILTERS: (state, action) =>  {
        state.filters = action.payload;
    },
    UPDATE_NEW_RECIPE: (state, action) => {
        state.newRecipe = action.payload;
    }
});
