import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledSection } from "../../../layout/Styles/Sections";
import { addRecipeAsync } from "../../../store/recipes/recipesActions";

type Props = RouteComponentProps;

const AddRecipeForm = (props: Props) => {
  const dispatch = useDispatch();
  const [newRecipeName, setNewRecipeName] = useState("");
  //store
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);
  const updatingRecipes = useSelector(
    (state: ApplicationState) => state.recipes.updating
  );

  const updateRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecipeName(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      addRecipe();
    }
  };

  const addRecipe = async () => {
    if (newRecipeName === "") {
      return;
    }

    dispatch(addRecipeAsync(newRecipeName, auth.uid, props.history));
    setNewRecipeName("");
  };

  const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <StyledSection>
      <p>New recipe</p>
      <form onSubmit={preventDefault}>
        <div>
          <input
            id="input-recipe-name"
            type="text"
            onChange={updateRecipeName}
            value={newRecipeName}
            disabled={updatingRecipes}
            onKeyPress={handleKeyPress}
          />
        </div>
        <ButtonPrimary onClick={addRecipe} disabled={updatingRecipes}>
          Create
        </ButtonPrimary>
      </form>
    </StyledSection>
  );
};

export default withRouter(AddRecipeForm);
