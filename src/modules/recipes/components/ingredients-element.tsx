import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import AddIngredientForm from "modules/recipes/components/add-ingredient-form";
import { Recipe } from "modules/recipes/models";
import { deleteIngredientAsync } from "modules/recipes/store/recipe-actions";

interface Props {
  recipe: Recipe;
  isEditing: boolean;
}

const IngredientsElement: React.FC<Props> = ({ recipe, isEditing }) => {
  const dispatch = useDispatch();
  const isUpdatingRecipe = useSelector(
    (state: ApplicationState) => state.recipe.isUpdating
  );

  const deleteIngredient = (ingredient: string) => (e: any) => {
    dispatch(deleteIngredientAsync(recipe, ingredient));
  };

  const renderIngredients = () => {
    return recipe.ingredients?.map((ingredient, index) => (
      <p key={index}>
        {ingredient}
        {isEditing && (
          <button
            disabled={isUpdatingRecipe}
            onClick={deleteIngredient(ingredient)}
          >
            X
          </button>
        )}
      </p>
    ));
  };

  return (
    <div className="recipe-ingredients">
      <h2>Ingredients</h2>
      {renderIngredients()}
      <AddIngredientForm recipe={recipe} isEditing={isEditing} />
    </div>
  );
};

export default IngredientsElement;
