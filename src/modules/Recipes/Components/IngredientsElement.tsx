import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../..";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import AddIngredientForm from "./AddIngredientForm";
import { Recipe } from "../models";

interface Props {
  recipe: Recipe;
  editing: boolean;
}

const IngredientsElement: React.FC<Props> = ({ recipe, editing }) => {
  const firebase = useSelector((state: ApplicationState) => state.firebase);
  const uid = firebase.auth.uid;

  useFirebaseConnect([{ path: `carts/${uid}` }]);
  const cart = useSelector(
    (state: ApplicationState) =>
      state.firebase.data.carts && state.firebase.data.carts[uid]
  );

  if (!isLoaded(cart)) {
    return <div>Loading...</div>;
  }

  if (isEmpty(cart)) {
    return <div>Cart empty</div>;
  }

  return (
    <>
      <h5>Ingredients ({recipe.ingredients.length})</h5>
      {/* <>
            {ingredientGroups &&
              ingredientGroups.map((ingredientGroup, index) => {
                return renderIngredientGroup(
                  ingredientGroups.length,
                  ingredientGroup,
                  index
                );
              })}
            {ingredientGroups &&
              renderIngredientGroup(ingredientGroups.length, null, null)}
          </> */}
      {recipe.ingredients.forEach((ingredient) => (
        <p>{ingredient}</p>
      ))}
      <AddIngredientForm editing={editing} />
    </>
  );
};

export default IngredientsElement;
