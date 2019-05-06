import { IngredientType, IngredientItem, RecipeType } from "./models";

export const getIngredientText = (ingredientItem: IngredientItem) => {
    let quantity = ingredientItem.quantity;
    if (ingredientItem.type === IngredientType.Cup) {
        quantity = getCupQuantities(quantity);
    }

    return `${ingredientItem.quantity} ${getIngredientTypeText(ingredientItem.type)} ${ingredientItem.ingredient.name.toLowerCase()}`
}

export const getCupQuantities = (quantity: string): string => {
    switch (quantity) {
        case "0.5":
            return "½";
        case "0.25":
            return "¼";
        case "0.75":
            return "¾";
        default:
            return quantity;
    }
}

export const getIngredientTypeText = (ingredientType: IngredientType) => {
    switch (ingredientType) {
        case IngredientType.Unit:
            return "";
        case IngredientType.Cup:
            return "cup(s)";
        case IngredientType.Gram:
            return "gram(s)";
        case IngredientType.Tablespoon:
            return "tablespoon(s)";
        case IngredientType.Teaspoon:
            return "teaspoon(s)";
    }
}