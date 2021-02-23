import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { ApplicationState } from "index";
import { addRecipeAsync } from "modules/recipes/store/recipes-actions";
import { auth } from "firebase-config";

interface Props {
  cookbookId: string;
};

const AddRecipeForm: React.FC<Props> = ({ cookbookId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newRecipeName, setNewRecipeName] = useState("");
  const updatingRecipes = useSelector(
    (state: ApplicationState) => state.recipes.isUpdating
  );
  const uid = auth.currentUser.uid

  const updateRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecipeName(e.target.value);
  };

  const handleKeyPress = (event: any) => {
    if (event.charCode === 13) {
      addRecipe();
    }
  };

  const addRecipe = async () => {
    if (newRecipeName === "") {
      return;
    }

    dispatch(addRecipeAsync(newRecipeName, cookbookId, uid, history));
    setNewRecipeName("");
  };

  return (
    <div>
      <p>New recipe</p>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
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
        <button onClick={addRecipe} disabled={updatingRecipes}>
          Create
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
