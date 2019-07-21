import { createReducer } from "redux-starter-kit";
import { Recipe } from "../../modules/Recipes/models";

export interface Filters {
    type?: string;
    cuisine?: string;
}

export interface RecipesState {
    recipes: Recipe[];
    loadingRecipes: boolean;
    updatingRecipes: boolean;
    filters: Filters;
}

const initialRecipesState: RecipesState = {
    recipes: [],
    loadingRecipes: false,
    updatingRecipes: false,
    filters: null
};

export const recipesReducer = createReducer(initialRecipesState, {
    FETCH_RECIPES_START: (state) => {
        state.loadingRecipes = true;
        state.filters = null;
    },
    FETCH_RECIPES_STOP: (state) => {
        state.loadingRecipes = false;
    },
    UPDATE_RECIPES_START: (state) => {
        state.updatingRecipes = false;
    },
    UPDATE_RECIPES_STOP: (state) => {
        state.updatingRecipes = false;
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
    }
});
