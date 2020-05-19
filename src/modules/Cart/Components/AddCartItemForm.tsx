import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../..";
import { addCartItemAsync } from "../../../store/cart/cartActions";

const AddCartItemForm = () => {
  const dispatch = useDispatch();
  const [newCartItem, setNewCartItem] = useState<string>("");
  const firebase = useSelector((state: ApplicationState) => state.firebase);

  const addIngredient = async () => {
    if (!newCartItem) {
      return;
    }
    dispatch(addCartItemAsync(firebase.auth.uid, newCartItem));
    setNewCartItem("");
  };

  const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    setNewCartItem(e.currentTarget.value);
  };

  return (
    <div className="cart-new-item">
      <h2>New cart item</h2>
      <form onSubmit={preventDefault}>
        <input
          className="cart-new-item-input"
          value={newCartItem}
          onChange={handleChange}
        />
        <button onClick={addIngredient}>Add</button>
      </form>
    </div>
  );
};

export default AddCartItemForm;
