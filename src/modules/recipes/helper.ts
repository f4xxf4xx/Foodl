
export const getFormattedIngredient = (ingredient: string): string => {
  ingredient = ingredient.replace(".25", "¼");
  ingredient = ingredient.replace(".5", "½");
  ingredient = ingredient.replace(".75", "¾");

  return ingredient;
};
