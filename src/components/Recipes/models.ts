export interface Ingredient {
    ingredientId: number;
    name: string;
}

export interface IngredientItem {
    ingredientItemId: number;
    quantity: number;
    type: IngredientType;
    ingredientId: number;
    ingredient: Ingredient;
    recipeId: number;
}

export enum IngredientType {
    Cup,
    Tablespoon,
    Teaspoon,
    Unit,
    Gram
}

export interface Recipe {
    recipeId: number;
    cookbookId: number;
    recipeTypeId: number;
    name: string;
    description: string;
    recipeType: RecipeType;
    duration: number;
    ingredientItems: IngredientItem[];
    recipeSteps: RecipeStep[];
    recipeTagItems: RecipeTagItem[];
}

export interface RecipeStep {
    recipeStepId: number;
    recipeId: number;
    order: number;
    description: string;
    imageUrl: string;
}

export interface RecipeTagItem {
    recipeTagItemId: number;
    recipeId: number;
    recipeTagId: number;
    recipeTag: RecipeTag;
}

export interface RecipeTag {
    recipeTagId: number;
    name: string;
}

export interface RecipeType {
    recipeTypeId: number;
    name: string;
}

export interface InputAddIngredientItem {
    recipeId: number;
    name?: string;
}