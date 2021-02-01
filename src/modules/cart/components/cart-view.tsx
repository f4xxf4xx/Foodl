import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import { Container } from "layout/container";
import AddCartItemForm from "modules/cart/components/add-cart-item-form";

import {
  fetchCartItemsAsync,
  deleteCartItemAsync,
  deleteAllCartItemsAsync,
} from "store/cart/cart-actions";

const CartView = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: ApplicationState) => state.cart);
  const profile = useSelector((state: ApplicationState) => state.user.profile);
  const [items, setItems] = useState([]);

  useEffect(() => {
    dispatch(fetchCartItemsAsync(profile.uid, setItems));
  }, [profile.uid, dispatch]);

  const deleteAllCartItems = () => async () => {
    dispatch(deleteAllCartItemsAsync(profile.uid));
  };

  const deleteCartItem = (cartItemName: string) => async () => {
    dispatch(deleteCartItemAsync(profile.uid, cartItemName));
  };

  const renderCartItems = () => {
    if (cart.isLoading) {
      return <p>Loading...</p>;
    }
    if (items.length === 0) {
      return <h5>Cart is empty</h5>;
    }

    return (
      <table className="cart-table">
        <thead className="cart-table-header">
          <tr>
            <th>Ingredients</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="cart-table-body">
          {items.map((cartItem, index) => (
            <tr key={index}>
              <td>{cartItem}</td>
              <td>
                <button
                  disabled={cart.isUpdating}
                  onClick={deleteCartItem(cartItem)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Container>
      <h1>Cart</h1>
      <AddCartItemForm />
      <div>
        <button disabled={cart.isUpdating} onClick={deleteAllCartItems()}>
          Delete all items
        </button>
      </div>
      {renderCartItems()}
    </Container>
  );
};

export default CartView;
