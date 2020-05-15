import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledSection } from "../../../layout/Styles/Sections";
import * as cartService from "../../../services/CartService";

const AddCartItemForm = () => {
  const dispatch = useDispatch();
  const [newCartItem, setNewCartItem] = useState<string>();
  const firebase = useSelector((state: ApplicationState) => state.firebase);
  const cartUpdating = useSelector(
    (state: ApplicationState) => state.cart.updating
  );

  const addIngredient = async () => {
    if (!newCartItem) {
      return;
    }
    dispatch(cartService.addItemAsync(firebase.auth.uid, newCartItem));
  };

  const updateCurrentSelectedIngredient = (e: any) => {
    setNewCartItem(e);
  };

  const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <StyledSection>
      <h6>New cart item</h6>
      <form onSubmit={preventDefault}>
        <div>
          <input
            id="input-ingredient"
            value={newCartItem}
            onChange={updateCurrentSelectedIngredient}
          />
        </div>
        <ButtonPrimary onClick={addIngredient} disabled={cartUpdating}>
          Add
        </ButtonPrimary>
      </form>
    </StyledSection>
  );
};

export default AddCartItemForm;
