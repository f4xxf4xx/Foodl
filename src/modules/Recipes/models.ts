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
    Gram = "gram",
}

export interface Recipe {
    id?: string;
    name: string;
    description?: string;
    slug: string;
    type?: RecipeType;
    duration?: number;
    tags?: Tag[];
    cuisine?: Cuisine;
}

export enum RecipeType {
    Drink = "Drink",
    Breakfast = "Breakfast",
    Appetizer = "Appetizer",
    Meal = "Meal",
    Dessert = "Dessert"
}

export enum Tag {
    Vegetarian = "Vegetarian",
    BBQ = "BBQ",
    Pasta = "Pasta",
    Soup = "Soup",
    Pizza = "Pizza",
    Beef = "Beef",
    Chicken = "Chicken",
    Fish = "Fish",
    Salad = "Salad",
    Cookie = "Cookie"
}

export enum Cuisine {
    Indian = "Indian",
    Italian = "Italian",
    American = "American",
    Greek = "Greek"
}

export interface Step {
    id?: string;
    order: number;
    text: string;
}
