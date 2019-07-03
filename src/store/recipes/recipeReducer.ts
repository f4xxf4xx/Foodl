import { createReducer } from "redux-starter-kit";
import { Recipe, IngredientItem, Step, Cuisine } from "../../components/Recipes/models";

export type RecipeState = {
    recipe: Recipe;
    ingredientItems: IngredientItem[];
    steps: Step[];
    loadingRecipe: boolean;
    updatingRecipe: boolean;
    loadingIngredientItems: boolean;
    updatingIngredientItems: boolean;
    loadingSteps: boolean;
    updatingSteps: boolean
}

const initialRecipeState: RecipeState = {
    recipe: null,
    ingredientItems: [],
    steps: [],
    loadingRecipe: false,
    updatingRecipe: false,
    loadingIngredientItems: false,
    updatingIngredientItems: false,
    loadingSteps: false,
    updatingSteps: false
}

export const recipeReducer = createReducer(initialRecipeState, {
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
    FETCH_STEPS_START: (state) => {
        state.loadingSteps = true;
    },
    FETCH_STEPS_STOP: (state) => {
        state.loadingSteps = false;
    },
    UPDATE_STEPS_START: (state) => {
        state.updatingSteps = true;
    },
    UPDATE_STEPS_STOP: (state) => {
        state.updatingSteps = false;
    },
    UPDATE_RECIPE: (state, action) => {
        state.recipe = action.payload;
    },
    UPDATE_INGREDIENTITEMS: (state, action) => {
        state.ingredientItems = action.payload;
    },
    UPDATE_STEPS: (state, action) => {
        state.steps = action.payload;
    },
    UPDATE_STEP: (state, action) => {
        state.steps = state.steps.map((item) => {
            if(item.id === action.payload.id) {
                return action.payload;
            }
            return item;
        })
    },
    ADD_INGREDIENTITEM: (state, action) => {
        state.ingredientItems.push(action.payload);
    },
    ADD_STEP: (state, action) => {
        state.steps.push(action.payload);
    },
    DELETE_INGREDIENTITEM: (state, action) => {
        state.ingredientItems = state.ingredientItems.filter(i => i.id !== action.payload);
    },
    DELETE_STEP: (state, action) => {
        state.steps = state.steps.filter(i => i.id !== action.payload);
    },
});

const initialCuisinesState: CuisinesState = {
    cuisines: [],
    loadingCuisines: false,
    updatingCuisines: false
}

export type CuisinesState = {
    cuisines: Cuisine[];
    loadingCuisines: boolean;
    updatingCuisines: boolean;
}

export const cuisinesReducer = createReducer(initialCuisinesState, {
    FETCH_CUISINES_START: (state) => {
        state.loadingCuisines = true;
    },
    FETCH_CUISINES_STOP: (state) => {
        state.loadingCuisines = false;
    },
    ADD_CUISINE: (state, action) => {
        state.cuisines.push(action.payload);
    },
    UPDATE_CUISINES: (state, action) => {
        state.cuisines = action.payload;
    }
});