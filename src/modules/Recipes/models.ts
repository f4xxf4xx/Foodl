import { RecipeType, Tag, Cuisine } from "./constants";

export interface IngredientItem {
    id?: string;
    quantity: string;
    type: string;
    name: string;
}

export interface Recipe {
    id?: string;
    uid: string;
    name: string;
    description?: string;
    slug: string;
    type?: RecipeType;
    duration?: number;
    tags?: Tag[];
    cuisine?: Cuisine;
}

export interface Step {
    id?: string;
    order: number;
    text: string;
}
