import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import { addCartItemAsync } from "modules/cart/store/cart-actions";

const AddCartItemForm = () => {
  const dispatch = useDispatch();
  const [newCartItem, setNewCartItem] = useState<string>("");
  const profile = useSelector((state: ApplicationState) => state.user.profile);

  const addIngredient = async () => {
    if (!newCartItem) {
      return;
    }
    dispatch(addCartItemAsync(profile.uid, newCartItem));
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
