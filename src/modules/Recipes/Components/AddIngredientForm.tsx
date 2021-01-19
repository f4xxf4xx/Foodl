import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "index";
import { addIngredientAsync } from "store/recipes/recipeActions";
import { Recipe } from "modules/Recipes/models";

interface Props {
  recipe: Recipe;
  isEditing: boolean;
}

const AddIngredientForm: React.FC<Props> = ({ recipe, isEditing }) => {
  const dispatch = useDispatch();
  const [newIngredient, setNewIngredient] = useState<string>("");
  const isUpdatingRecipe = useSelector(
    (state: ApplicationState) => state.recipe.isUpdating
  );

  const addIngredient = () => {
    if (newIngredient === "") {
      return;
    }
    dispatch(addIngredientAsync(recipe, newIngredient));
    setNewIngredient("");
  };

  const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    setNewIngredient(e.currentTarget.value);
  };

  return (
    <>
      {isEditing && (
        <form onSubmit={preventDefault}>
          <label htmlFor="input-ingredient">Add ingredient</label>
          <input
            id="input-ingredient"
            value={newIngredient}
            onChange={handleChange}
            disabled={isUpdatingRecipe}
          />
          <button onClick={addIngredient}>
            {isUpdatingRecipe ? "Loading" : "Add"}
          </button>
        </form>
      )}
    </>
  );
};

export default AddIngredientForm;
