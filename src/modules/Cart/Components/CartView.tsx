import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../..";
import AddCartItemForm from "./AddCartItemForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./Cart.css";
import {
  fetchCartAsync,
  deleteAllCartItemsAsync,
  deleteCartItemAsync,
} from "../../../store/cart/cartActions";

const CartView = () => {
  const dispatch = useDispatch();
  //store
  const cart = useSelector((state: ApplicationState) => state.cart);
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);

  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchCartAsync(auth.uid));
    };

    fetch();
  }, [auth.uid, dispatch]);

  const deleteAllCartItems = () => async () => {
    dispatch(deleteAllCartItemsAsync(auth.uid));
  };

  const deleteCartItem = (cartItemName: string) => async () => {
    dispatch(deleteCartItemAsync(auth.uid, cartItemName));
  };

  const renderCartItems = () => {
    if (cart.loading) {
      return <p>Loading...</p>;
    }
    if (cart.cartItems.length === 0) {
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
          {cart.cartItems.map((cartItem, index) => (
            <tr key={index}>
              <td>{cartItem}</td>
              <td>
                <button
                  disabled={cart.updating}
                  onClick={deleteCartItem(cartItem)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <h1>Cart</h1>
      <AddCartItemForm />
      <div>
        <button disabled={cart.updating} onClick={deleteAllCartItems()}>
          Delete all items
        </button>
      </div>
      {renderCartItems()}
    </>
  );
};

export default CartView;
