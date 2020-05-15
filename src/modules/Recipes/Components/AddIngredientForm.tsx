import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Creatable from "react-select/creatable";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledSection } from "../../../layout/Styles/Sections";
import * as recipeService from "../../../services/recipeService";

interface OwnProps {
  editing: boolean;
}

const AddIngredientForm: React.FC<OwnProps> = (props: OwnProps) => {
  const dispatch = useDispatch();
  const [newIngredient, setNewIngredient] = useState<string>();
  const [group, setGroup] = useState<string>();
  const recipe = useSelector((state: ApplicationState) => state.recipe.recipe);
  const ingredientGroupOptions =
    recipe.ingredientGroups &&
    recipe.ingredientGroups.map((group) => {
      return {
        value: group,
        label: group,
      };
    });

  const updateGroup = (e: any) => {
    setGroup(e ? e.label : null);
  };

  const addIngredient = () => {
    if (!newIngredient) {
      return false;
    }

    if (
      group &&
      (!recipe.ingredientGroups || !recipe.ingredientGroups.includes(group))
    ) {
      dispatch(recipeService.addIngredientGroupAsync(recipe, group));
    }

    try {
      dispatch(recipeService.addIngredientAsync(recipe, newIngredient));
      setGroup(null);
    } finally {
    }
  };

  const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {props.editing && (
        <StyledSection>
          <form onSubmit={preventDefault}>
            <p>Add ingredient</p>
            <label htmlFor="input-ingredient">Ingredient</label>
            <input
              id="input-ingredient"
              value={newIngredient}
              onBlur={() => setNewIngredient}
            />
            <label htmlFor="input-ingredient">Group</label>
            <Creatable
              id="input-group"
              options={ingredientGroupOptions}
              value={group}
              onChange={updateGroup}
              isClearable
            />
            <ButtonPrimary onClick={addIngredient}>Add</ButtonPrimary>
          </form>
        </StyledSection>
      )}
    </>
  );
};

export default AddIngredientForm;
