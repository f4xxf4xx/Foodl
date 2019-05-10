import { Ingredient } from "../Ingredients/models";

export interface IngredientItem {
    id?: string;
    quantity: string;
    type: string;
    name: string;
}

export enum IngredientType {
    Cup = "cup",
    Tablespoon = "tablespoon",
    Teaspoon = "teaspoon",
    Unit = "unit",
    Gram = "gram"
}

export interface Recipe {
    id?: string;
    name: string;
    description?: string;
    slug: string;
    recipeType?: string;
    duration?: number;
    ingredientItems?: IngredientItem[];
    tags?: string[];
    cuisine?: string;
}