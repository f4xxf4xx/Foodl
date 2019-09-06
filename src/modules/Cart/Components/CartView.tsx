import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";
import { ApplicationState } from "../../..";
import { ButtonError } from "../../../layout/Styles/Buttons";
import { CartService } from "../../../services/CartService";
import * as cartActions from "../../../store/cart/cartActions";
import * as cartActions2 from "../../../store/cart/cartActions2";
import AddCartItemForm from "./AddCartItemForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface DispatchProps {
    fetchCartItemsStart: typeof cartActions.fetchCartItemsStart;
    fetchCartItemsStop: typeof cartActions.fetchCartItemsStop;
    updateCartItemsStart: typeof cartActions.updateCartItemsStart;
    updateCartItemsStop: typeof cartActions.updateCartItemsStop;
    updateCartItems: typeof cartActions.updateCartItems;
    deleteCartItem: typeof cartActions.deleteCartItem;
    deleteAllCartItems: typeof cartActions.deleteAllCartItems;
}

type Props = DispatchProps & RouteProps;

const CartView = () => {
    const dispatch = useDispatch();
    //store
    const cartItems = useSelector((state: ApplicationState) => state.cart.cartItems);
    const firebase = useSelector((state: ApplicationState) => state.firebase);
    //state
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await CartService.getCartItems(firebase.auth.uid)
                dispatch({ type: cartActions2.updateCartItems, payload: response });
                setLoading(false);
            }
            catch (error) {
                toast.error(error);
                setLoading(false);
            }
        }
        fetch();
    }, []);

    const deleteAllCartItems = () => (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteItems = async () => {
            setUpdating(true);
            try {
                await CartService.deleteAllItems(firebase.auth.uid);
                dispatch({ type: cartActions2.deleteAllCartItems });
                toast.success("Deleted all!");
            }
            catch (error) {
                toast.error(error);

            }
            finally {
                setUpdating(false);
            };
        }
        deleteItems();
    }

    const deleteCartItem = (cartItemName: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteItem = async () => {
            setUpdating(true);
            try {
                dispatch({ type: cartActions2.deleteCartItem, payload: cartItemName })
                toast.success("Deleted!");
            }
            catch(error) {
                toast.error(error);
            }
            finally {
                setUpdating(false);
            }
        }
        deleteItem();
    }

    const renderCartItems = () => {
        return (
            <Paper>
                {cartItems.length > 0
                    ?
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell component="th">Ingredients</TableCell>
                                <TableCell component="th">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((cartItem, index) =>
                                <TableRow key={index}>
                                    <TableCell>{cartItem.name}</TableCell>
                                    <TableCell>
                                        <ButtonError
                                            width="15"
                                            disabled={updating}
                                            onClick={deleteCartItem(cartItem.name)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </ButtonError>
                                    </TableCell>
                                </TableRow>,
                            )}
                        </TableBody>
                    </Table>
                    :
                    <Typography variant="h5">
                        Cart is empty
                    </Typography>
                }
            </Paper>
        );
    }

    return (
        <>
            <Typography variant="h3">Cart</Typography>
            {loading ?
                <Loader active={true} inline="centered" />
                :
                <>
                    <AddCartItemForm updating={updating} />
                    {cartItems && cartItems.length > 0 &&
                        <div>
                            <ButtonError onClick={deleteAllCartItems()}>
                                Delete all items
                            </ButtonError>
                        </div>
                    }
                    {renderCartItems()}
                </>
            }
        </>
    )
}

export default CartView;
