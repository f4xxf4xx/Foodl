import { createReducer } from "redux-starter-kit";
import { Recipe, IngredientItem } from "./models";

export type RecipeState = {
    recipe: Recipe;
    ingredientItems: IngredientItem[];
    loadingRecipe: boolean;
    updatingRecipe: boolean;
    loadingIngredientItems: boolean;
    updatingIngredientItems: boolean;
}

const initialState: RecipeState = {
    recipe: null,
    ingredientItems: [],
    loadingRecipe: false,
    updatingRecipe: false,
    loadingIngredientItems: false,
    updatingIngredientItems: false
}

export const recipeReducer = createReducer(initialState, {
    FETCH_RECIPE_START: (state) => {
        state.loadingRecipe = true;
    },
    FETCH_RECIPE_STOP: (state) => {
        state.loadingRecipe = false;
    },
    UPDATE_RECIPE_START: (state) => {
        state.updatingRecipe = true;
    },
    UPDATE_RECIPE_STOP: (state) => {
        state.updatingRecipe = false;
    },
    FETCH_INGREDIENTITEMS_START: (state) => {
        state.loadingIngredientItems = true;
    },
    FETCH_INGREDIENTITEMS_STOP: (state) => {
        state.loadingIngredientItems = false;
    },
    UPDATE_INGREDIENTITEMS_START: (state) => {
        state.updatingIngredientItems = true;
    },
    UPDATE_INGREDIENTITEMS_STOP: (state) => {
        state.updatingIngredientItems = false;
    },
    UPDATE_RECIPE: (state, action) => {
        state.recipe = action.payload;
    },
    ADD_INGREDIENTITEM: (state, action) => {
        state.ingredientItems.push(action.payload);
    },
    DELETE_INGREDIENTITEM: (state, action) => {
        state.ingredientItems = state.ingredientItems.filter(i => i.id !== action.payload);
    },
});