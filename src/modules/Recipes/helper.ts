import { IngredientItem, IngredientType, Tag } from "./models";
import { faPizzaSlice, faHamburger, faCookie, faDrumstickBite, faFish, faCarrot } from "@fortawesome/free-solid-svg-icons";

export const getNumericQuantity = (quantity: string): string => {
    const quantityNumber = parseFloat(quantity);
    const flooredNumber = Math.floor(quantityNumber);
    const decimal = quantityNumber - flooredNumber;
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
            decimalText = "";
            break;
    }

    return `${flooredNumber > 0 ? flooredNumber : ""}${decimalText}`;
};

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
};

export const getIngredientTypeOptions = () => {
    return [
        {
            value: IngredientType.Cup,
            label: "cup(s)",
        },
        {
            value: IngredientType.Gram,
            label: "gram(s)",
        },
        {
            value: IngredientType.Tablespoon,
            label: "tablespoon(s)",
        },
        {
            value: IngredientType.Teaspoon,
            label: "teaspoon(s)",
        },
        {
            value: IngredientType.Unit,
            label: "unit(s)",
        },
    ];
};

export const getTagIcon = (tag: string) => {
    switch (tag) {
        case Tag.BBQ:
            return faHamburger;
        case Tag.Beef:
            return faPizzaSlice;
        case Tag.Chicken:
            return faDrumstickBite;
        case Tag.Cookie:
            return faCookie;
        case Tag.Fish:
            return faFish;
        case Tag.Pasta:
            return faPizzaSlice;
        case Tag.Pizza:
            return faPizzaSlice;
        case Tag.Salad:
            return faPizzaSlice;
        case Tag.Soup:
            return faPizzaSlice;
        case Tag.Vegetarian:
            return faCarrot;
    }
}