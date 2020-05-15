import {
  faPizzaSlice,
  faHamburger,
  faCookie,
  faDrumstickBite,
  faFish,
  faCarrot,
} from "@fortawesome/free-solid-svg-icons";

export const getFormattedIngredient = (ingredient: string): string => {
  ingredient = ingredient.replace(".25", "¼");
  ingredient = ingredient.replace(".5", "½");
  ingredient = ingredient.replace(".75", "¾");

  return ingredient;
};

export const getTagIcon = (tag: string) => {
  switch (tag) {
    case "bbq":
      return faHamburger;
    case "beef":
      return faPizzaSlice;
    case "chicken":
      return faDrumstickBite;
    case "cookie":
      return faCookie;
    case "fish":
      return faFish;
    case "pasta":
      return faPizzaSlice;
    case "pizza":
      return faPizzaSlice;
    case "salad":
      return faPizzaSlice;
    case "soup":
      return faPizzaSlice;
    case "vegetarian":
      return faCarrot;
  }
};
