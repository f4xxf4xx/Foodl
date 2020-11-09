import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "index";
import {
  addIngredientGroupItemAsync,
  addIngredientAsync,
} from "store/recipes/recipeActions";
import { IngredientGroup } from "modules/Recipes/models";

interface Props {
  editing: boolean;
  ingredientGroup: IngredientGroup;
}

const AddIngredientForm: React.FC<Props> = ({ editing, ingredientGroup }) => {
  const dispatch = useDispatch();
  const [newIngredient, setNewIngredient] = useState<string>("");
  const recipe = useSelector((state: ApplicationState) => state.recipe.recipe);
  const updatingIngredientGroups = useSelector(
    (state: ApplicationState) => state.recipe.updatingIngredientGroups
  );

  const addIngredient = () => {
    if (newIngredient === "") {
      return;
    }
    if (ingredientGroup?.id) {
      dispatch(
        addIngredientGroupItemAsync(recipe, ingredientGroup, newIngredient)
      );
    } else {
      dispatch(addIngredientAsync(recipe, newIngredient));
    }
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
      {editing && (
        <form onSubmit={preventDefault}>
          <label
            htmlFor={`input-ingredient-${
              ingredientGroup && ingredientGroup.name
            }`}
          >
            Add ingredient
          </label>
          <input
            id={`input-ingredient-${ingredientGroup && ingredientGroup.name}`}
            value={newIngredient}
            onChange={handleChange}
            disabled={updatingIngredientGroups}
          />
          <button onClick={addIngredient}>
            {updatingIngredientGroups ? "Loading" : "Add"}
          </button>
        </form>
      )}
    </>
  );
};

export default AddIngredientForm;
