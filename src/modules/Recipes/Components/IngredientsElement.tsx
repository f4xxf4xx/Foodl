import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary, ButtonSecondary } from "../../../layout/Styles/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { addCartItem } from "../../../store/cart/cartActions";
import AddIngredientForm from "./AddIngredientForm";

interface OwnProps {
  ingredients: string[];
  editing: boolean;
}

const IngredientsElement: React.FC<OwnProps> = ({ ingredients, editing }) => {
  const firebase = useSelector((state: ApplicationState) => state.firebase);
  const uid = firebase.auth.uid;
  const dispatch = useDispatch();

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
      <h5>Ingredients ({ingredients.length})</h5>
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
      {ingredients.forEach((ingredient) => (
        <p>{ingredient}</p>
      ))}
      <AddIngredientForm editing={editing} />
    </>
  );
};

export default IngredientsElement;
