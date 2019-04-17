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
    name: string;
    ingredientItems: IngredientItem[];
}

export interface InputAddIngredientItem {
    recipeId: number;
    name?: string;
}