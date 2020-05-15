import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Creatable from "react-select/creatable";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledSection } from "../../../layout/Styles/Sections";
import * as recipeService from "../../../services/RecipeService";

interface Props {
  editing: boolean;
}

const AddIngredientForm: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [newIngredient, setNewIngredient] = useState<string>();
  const [group, setGroup] = useState<string>();
  const recipe = useSelector((state: ApplicationState) => state.recipe.recipe);
  const ingredientGroups = useSelector(
    (state: ApplicationState) => state.recipe.ingredientGroups
  );
  const ingredientGroupOptions =
    ingredientGroups &&
    ingredientGroups.map((group) => {
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

    if (group && (!ingredientGroups || !ingredientGroups.includes(group))) {
      dispatch(recipeService.addIngredientGroupAsync(recipe, group));
    }

    try {
      //dispatch(addIngredientAsync(recipe, newIngredient));
      //setGroup(null);
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
