import { IngredientType, IngredientItem } from "./models";

export const getIngredientText = (ingredientItem: IngredientItem) => {
    const quantity = getNumericQuantity(ingredientItem.quantity);

    return `${quantity} ${getIngredientTypeText(ingredientItem.type)} ${ingredientItem.name.toLowerCase()}`
}

export const getNumericQuantity = (quantity: string): string => {
    const number = parseFloat(quantity);
    const flooredNumber = Math.floor(number);
    const decimal = number - flooredNumber;
    let decimalText = "";

    switch (decimal.toString()) {
        case "0.25":
            decimalText = "¼";
            break;
        case "0.5":
            decimalText = "½";
            break;
        case "0.75":
            decimalText = "¾";
            break;
        default:
            "";
    }

    return `${flooredNumber > 0 ? flooredNumber : ""}${decimalText}`
}

export const getIngredientTypeText = (ingredientType: string) => {
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

export const getIngredientTypeOptions = () => {
    return [
        {
            value: IngredientType.Cup,
            label: "cup(s)"
        },
        {
            value: IngredientType.Gram,
            label: "gram(s)"
        },
        {
            value: IngredientType.Tablespoon,
            label: "tablespoon(s)"
        },
        {
            value: IngredientType.Teaspoon,
            label: "teaspoon(s)"
        },
        {
            value: IngredientType.Unit,
            label: "unit(s)"
        },
    ]
}