import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import { Container } from "layout/container";
import AddCartItemForm from "modules/cart/components/add-cart-item-form";

import {
  fetchCartItemsAsync,
  deleteCartItemAsync,
  deleteAllCartItemsAsync,
} from "modules/cart/store/cart-actions";
import { auth } from "firebase-config";

const CartView = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: ApplicationState) => state.cart);
  const [items, setItems] = useState([]);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    dispatch(fetchCartItemsAsync(uid, setItems));
  }, [uid, dispatch]);

  const deleteAllCartItems = () => async () => {
    dispatch(deleteAllCartItemsAsync(uid));
  };

  const deleteCartItem = (cartItemName: string) => async () => {
    dispatch(deleteCartItemAsync(uid, cartItemName));
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
