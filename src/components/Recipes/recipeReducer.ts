import { createReducer } from "redux-starter-kit";
import { Recipe, IngredientItem } from "./models";

export type RecipeState = {
    recipes: Recipe[];
    currentRecipe: Recipe;
    currentIngredientItems: IngredientItem[];
    loadingRecipes: boolean;
    updatingRecipes: boolean;
    loadingRecipe: boolean;
    updatingRecipe: boolean;
    loadingIngredientItems: boolean;
    updatingIngredientItems: boolean;
    error: string;
}

const initialState: RecipeState = {
    recipes: [],
    currentRecipe: null,
    currentIngredientItems: [],
    loadingRecipes: false,
    updatingRecipes: false,
    loadingRecipe: false,
    updatingRecipe: false,
    loadingIngredientItems: false,
    updatingIngredientItems: false,
    error: null
}

export const recipeReducer = createReducer(initialState, {
    FETCH_RECIPES_BEGIN: (state) => {
        state.loadingRecipes = true;
        state.error = null;
        state.recipes = [];
    },
    FETCH_RECIPES_SUCCESS: (state, action) => {
        state.loadingRecipes = false;
        state.recipes = action.payload;
    },
    FETCH_RECIPES_FAILURE: (state, action) => {
        state.loadingRecipes = false;
        state.error = action.payload.error;
        state.recipes = [];
    },
    ADD_RECIPE_BEGIN: (state) => {
        state.updatingRecipes = true;
    },
    ADD_RECIPE_SUCCESS: (state, action) => {
        state.updatingRecipes = false;
        state.currentRecipe = action.payload;
        state.recipes.push(action.payload);
    },
    ADD_RECIPE_FAILURE: (state, action) => {
        state.updatingRecipes = false;
        state.error = action.payload.error;
    },
    DELETE_RECIPE_BEGIN: (state, action) => {
        state.updatingRecipes = true;
    },
    DELETE_RECIPE_SUCCESS: (state, action) => {
        state.updatingRecipes = false;
        state.recipes = state.recipes.filter(i => i.id !== action.payload);
    },
    DELETE_RECIPE_FAILURE: (state, action) => {
        state.updatingRecipes = false;        
        state.error = action.payload.error;
    },
    UPDATE_RECIPE_BEGIN: (state, action) => {
        state.updatingRecipes = true;
    },
    UPDATE_RECIPE_SUCCESS: (state, action) => {
        state.updatingRecipes = false;
        state.currentRecipe = action.payload;
    },
    UPDATE_RECIPE_FAILURE: (state, action) => {
        state.updatingRecipes = false;
    },
    FETCH_RECIPE_BEGIN: (state, action) => {
        state.loadingRecipe = true;
    },
    FETCH_RECIPE_SUCCESS: (state, action) => {
        state.loadingRecipe = false;
        state.currentRecipe = action.payload;
    },
    FETCH_RECIPE_FAILURE: (state, action) => {
        state.loadingRecipe = false;
    },
    FETCH_INGREDIENTITEMS_BEGIN: (state, action) => {
        state.loadingIngredientItems = true;
        state.error = null;
        state.currentIngredientItems = [];
    },
    FETCH_INGREDIENTITEMS_SUCCESS: (state, action) => {
        state.loadingIngredientItems = false;
        state.currentIngredientItems = action.payload;
    },
    FETCH_INGREDIENTITEMS_FAILURE: (state, action) => {
        state.loadingIngredientItems = false;
        state.error = action.payload.error;
        state.currentIngredientItems = [];
    },
    ADD_INGREDIENTITEM_BEGIN: (state, action) => {
        state.updatingIngredientItems = true;
    },
    ADD_INGREDIENTITEM_SUCCESS: (state, action) => {
        state.updatingIngredientItems = false;
        state.currentIngredientItems.push(action.payload);
    },
    ADD_INGREDIENTITEM_FAILURE: (state, action) => {
        state.updatingIngredientItems = false;
        state.error = action.payload.error;
    },
    DELETE_INGREDIENTITEM_BEGIN: (state, action) => {
        state.updatingIngredientItems = true;
    },
    DELETE_INGREDIENTITEM_SUCCESS: (state, action) => {
        state.updatingIngredientItems = false;
        state.currentIngredientItems = state.currentIngredientItems.filter(i => i.id !== action.payload);
    },
    DELETE_INGREDIENTITEM_FAILURE: (state, action) => {
        state.updatingIngredientItems = false;
        state.error = action.payload.error;
    },
});