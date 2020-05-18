import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../..";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import AddIngredientForm from "./AddIngredientForm";
import { Recipe } from "../models";
import { fetchCartAsync } from "../../../store/cart/cartActions";

interface Props {
  recipe: Recipe;
  editing: boolean;
}

const IngredientsElement: React.FC<Props> = ({ recipe, editing }) => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);
  const cart = useSelector((state: ApplicationState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.uid) {
      const fetch = async () => {
        dispatch(fetchCartAsync(auth.uid));
      };

      fetch();
    }
  }, [auth.uid, dispatch]);

  const renderIngredients = () => {
    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      return "No ingredients";
    }
    return recipe.ingredients?.map((ingredient, index) => (
      <p key={index}>{ingredient}</p>
    ));
  };

  return (
    <div className="recipe-ingredients">
      <h5>
        Ingredients{" "}
        {recipe.ingredients?.length && `(${recipe.ingredients?.length})`}
      </h5>
      {renderIngredients()}
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
      <AddIngredientForm editing={editing} />
    </div>
  );
};

export default IngredientsElement;
