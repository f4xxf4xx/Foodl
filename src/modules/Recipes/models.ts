import { RecipeType, Tag, Cuisine } from "./constants";

export interface IngredientItem {
    id?: string;
    quantity: string;
    type: string;
    name: string;
    prepType: string;
    group?: string;
}

export interface Recipe {
    id?: string;
    uid: string;
    name: string;
    description?: string;
    image?: string;
    imageFullPath?: string;
    slug: string;
    type?: RecipeType;
    duration?: number;
    tags?: Tag[];
    cuisine?: Cuisine;
    ingredientGroups?: string[];
}

export interface Step {
    id?: string;
    order: number;
    text: string;
}
