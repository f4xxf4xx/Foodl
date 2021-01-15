import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import AddIngredientForm from "modules/Recipes/Components/AddIngredientForm";
import { IngredientGroup } from "modules/Recipes/models";
import {
  fetchIngredientGroupsAsync,
  deleteIngredientAsync,
  deleteIngredientGroupItemAsync,
} from "store/recipes/recipeActions";

interface Props {
  editing: boolean;
}

const IngredientsElement: React.FC<Props> = ({ editing }) => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);
  const recipe = useSelector((state: ApplicationState) => state.recipe.recipe);
  const ingredientGroups = useSelector(
    (state: ApplicationState) => state.recipe.ingredientGroups
  );
  const updatingIngredients = useSelector(
    (state: ApplicationState) => state.recipe.updatingIngredientGroups
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.uid) {
      const fetch = async () => {
        //dispatch(fetchCartAsync(auth.uid));
      };

      fetch();
    }
  }, [auth.uid, dispatch]);

  useEffect(() => {
    if (auth.uid) {
      const fetch = async () => {
        dispatch(fetchIngredientGroupsAsync(recipe.id));
      };

      fetch();
    }
  }, [auth.uid, recipe, dispatch]);

  /* // TODO
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    return "No ingredients";
  } */

  const deleteIngredient = (ingredient: string) => (e: any) => {
    dispatch(deleteIngredientAsync(recipe, ingredient));
  };

  const deleteIngredientGroupItem = (
    ingredientGroup: IngredientGroup,
    ingredient: string
  ) => (e: any) => {
    dispatch(
      deleteIngredientGroupItemAsync(recipe, ingredientGroup, ingredient)
    );
  };

  const renderIngredients = () => {
    return recipe.ingredients?.map((ingredient, index) => (
      <p key={index}>
        {ingredient}
        {editing && (
          <button
            disabled={updatingIngredients}
            onClick={deleteIngredient(ingredient)}
          >
            X
          </button>
        )}
      </p>
    ));
  };

  const renderIngredientGroup = (ingredientGroup: IngredientGroup) => {
    return (
      <div key={ingredientGroup.id}>
        <h3>{ingredientGroup.name}</h3>
        {ingredientGroup.items?.map((ingredient, index) => (
          <p key={index}>
            {ingredient}
            {editing && (
              <button
                disabled={updatingIngredients}
                onClick={deleteIngredientGroupItem(ingredientGroup, ingredient)}
              >
                X
              </button>
            )}
          </p>
        ))}
        <AddIngredientForm
          editing={editing}
          ingredientGroup={ingredientGroup}
        />
      </div>
    );
  };

  return (
    <div className="recipe-ingredients">
      <h2>Ingredients</h2>
      {renderIngredients()}
      <AddIngredientForm editing={editing} ingredientGroup={null} />
      {ingredientGroups?.map((ingredientGroup) =>
        renderIngredientGroup(ingredientGroup)
      )}
    </div>
  );
};

export default IngredientsElement;
