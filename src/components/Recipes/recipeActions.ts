import { createAction } from "redux-starter-kit";

//RECIPE
export const fetchRecipeStart = createAction("FETCH_RECIPE_START");
export const fetchRecipeStop = createAction("FETCH_RECIPE_STOP");
export const updateRecipeStart = createAction("UPDATE_RECIPE_START");
export const updateRecipeStop = createAction("UPDATE_RECIPE_STOP");
export const updateRecipe = createAction("UPDATE_RECIPE");

//INGREDIENT ITEMS
export const fetchIngredientItemsStart = createAction("FETCH_INGREDIENTITEMS_START");
export const fetchIngredientItemsStop = createAction("FETCH_INGREDIENTITEMS_STOP");
export const updateIngredientItemsStart = createAction("UPDATE_INGREDIENTITEMS_START");
export const updateIngredientItemsStop = createAction("UPDATE_INGREDIENTITEMS_STOP");
export const updateIngredientItems = createAction("UPDATE_INGREDIENTITEMS");
export const addIngredientItem = createAction("ADD_INGREDIENTITEM");
export const deleteIngredientItem = createAction("DELETE_INGREDIENTITEM");

//STEPS
export const fetchStepsStart = createAction("FETCH_STEPS_START");
export const fetchStepsStop = createAction("FETCH_STEPS_STOP");
export const updateStepsStart = createAction("UPDATE_STEPS_START");
export const updateStepsStop = createAction("UPDATE_STEPS_STOP");
export const updateSteps = createAction("UPDATE_STEPS");
export const updateStep = createAction("UPDATE_STEP");
export const addStep = createAction("ADD_STEP");
export const deleteStep = createAction("DELETE_STEP");

//CUISINES
export const fetchCuisinesStart = createAction("FETCH_CUISINES_START");
export const fetchCuisinesStop = createAction("FETCH_CUISINES_STOP");
export const updateCuisines = createAction("UPDATE_CUISINES");
export const addCuisine = createAction("ADD_CUISINE");