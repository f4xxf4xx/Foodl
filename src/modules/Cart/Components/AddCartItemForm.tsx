import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { addCartItemAsync } from "../../../store/cart/cartActions";

const AddCartItemForm = () => {
  const dispatch = useDispatch();
  const [newCartItem, setNewCartItem] = useState<string>("");
  const firebase = useSelector((state: ApplicationState) => state.firebase);

  const addIngredient = async () => {
    if (!newCartItem) {
      return;
    }
    setNewCartItem("");
    dispatch(addCartItemAsync(firebase.auth.uid, newCartItem));
  };

  const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    setNewCartItem(e.currentTarget.value);
  };

  return (
    <div className="cart-new-item">
      <h2>New cart item</h2>
      <form onSubmit={preventDefault}>
        <input
          className="cart-new-item-input"
          id="input-ingredient"
          value={newCartItem}
          onChange={handleSubmit}
        />
        <ButtonPrimary onClick={addIngredient}>Add</ButtonPrimary>
      </form>
    </div>
  );
};

export default AddCartItemForm;
