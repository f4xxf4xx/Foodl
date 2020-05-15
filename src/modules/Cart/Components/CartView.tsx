import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../..";
import { ButtonError } from "../../../layout/Styles/Buttons";
import * as cartService from "../../../services/CartService";
import AddCartItemForm from "./AddCartItemForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CartView = () => {
  const dispatch = useDispatch();
  //store
  const cartItems = useSelector(
    (state: ApplicationState) => state.cart.cartItems
  );
  const cartLoading = useSelector(
    (state: ApplicationState) => state.cart.loading
  );
  const cartUpdating = useSelector(
    (state: ApplicationState) => state.cart.updating
  );
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);

  useEffect(() => {
    const fetch = async () => {
      dispatch(cartService.fetchAsync(auth.uid));
    };

    fetch();
  }, [auth.uid, dispatch]);

  const deleteAllCartItems = () => async () => {
    dispatch(cartService.deleteAllItemsAsync(auth.uid));
  };

  const deleteCartItem = (cartItemName: string) => async () => {
    dispatch(cartService.deleteItemAsync(auth.uid, cartItemName));
  };

  const renderCartItems = () => {
    return (
      <div>
        {cartItems.length > 0 ? (
          <table>
            <th>
              <tr>
                <th>Ingredients</th>
                <th>Delete</th>
              </tr>
            </th>
            <tbody>
              {cartItems.map((cartItem, index) => (
                <tr key={index}>
                  <td>{cartItem}</td>
                  <td>
                    <ButtonError
                      width="15"
                      disabled={cartUpdating}
                      onClick={deleteCartItem(cartItem)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </ButtonError>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h5>Cart is empty</h5>
        )}
      </div>
    );
  };

  return (
    <>
      <h3>Cart</h3>
      {cartLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddCartItemForm />
          {cartItems && cartItems.length > 0 && (
            <div>
              <ButtonError
                disabled={cartUpdating}
                onClick={deleteAllCartItems()}
              >
                Delete all items
              </ButtonError>
            </div>
          )}
          {renderCartItems()}
        </>
      )}
    </>
  );
};

export default CartView;
