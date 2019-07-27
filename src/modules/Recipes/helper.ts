import { faPizzaSlice, faHamburger, faCookie, faDrumstickBite, faFish, faCarrot } from "@fortawesome/free-solid-svg-icons";
import { IngredientType, Tag } from "./constants";
import { IngredientItem } from "./models";

export const getIngredientQuantity = (ingredientItem: IngredientItem): string => {
    return `${getNumericQuantity(ingredientItem)} ${getIngredientTypeText(ingredientItem)}`
}

export const getIngredientName = (ingredientItem: IngredientItem) => {
    if(ingredientItem.prepType) {
        return `${ingredientItem.name.toLowerCase()}, ${ingredientItem.prepType.toLowerCase()}`
    }
    return ingredientItem.name.toLowerCase();
}

const getNumericQuantity = (ingredientItem: IngredientItem): string => {
    const quantityNumber = parseFloat(ingredientItem.quantity);
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

const getIngredientTypeText = (ingredientItem: IngredientItem) => {
    if(ingredientItem.type == IngredientType.Unit.toString()) {
        return "";
    }

    if(parseFloat(ingredientItem.quantity) > 1) {
        return `${ingredientItem.type.toLowerCase()}s`
    }

    return ingredientItem.type.toLowerCase();
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