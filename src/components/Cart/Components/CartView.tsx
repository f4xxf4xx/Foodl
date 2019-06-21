import React, { PureComponent } from "react";
import { RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { compose, bindActionCreators, Dispatch } from "redux";
import * as cartActions from "../cartActions";
import { cartService } from "../cartService";
import Button from '@material-ui/core/Button';
import { TableHead, TableRow, Table, TableCell, TableBody, Paper, Typography, FormLabel, TextField } from "@material-ui/core";
import { Loader} from 'semantic-ui-react'
import { Ingredient } from "../../Ingredients/models";
import { ButtonError } from "../../Layout/Styles/Buttons";
import { Title } from "../../Layout/Styles/Sections";

type StateProps = {
    cartItems: Ingredient[];
    loadingCartItems: boolean;
    updatingCartItems: boolean;
};

type DispatchProps = {
    fetchCartItemsStart: typeof cartActions.fetchCartItemsStart;
    fetchCartItemsStop: typeof cartActions.fetchCartItemsStop;
    updateCartItemsStart: typeof cartActions.updateCartItemsStart;
    updateCartItemsStop: typeof cartActions.updateCartItemsStop;
    updateCartItems: typeof cartActions.updateCartItems;
    deleteCartItem: typeof cartActions.deleteCartItem;
    deleteAllCartItems: typeof cartActions.deleteAllCartItems;
};

type Props = StateProps & DispatchProps & RouteProps;

class CartViewBase extends PureComponent<Props> {
    componentDidMount() {
        this.props.fetchCartItemsStart();
        return cartService.getCartItems()
            .then(cartItems => {
                this.props.updateCartItems(cartItems);
                this.props.fetchCartItemsStop();
            })
            .catch(() => {
                toast.error("Error fetching the cart items");
                this.props.fetchCartItemsStop();
            });
    }

    deleteAllCartItems(): void {
        this.props.updateCartItemsStart();
        cartService.deleteAllItems()
            .then(() => {
                this.props.deleteAllCartItems();
                this.props.updateCartItemsStop();
                toast.success("Deleted all!");
            })
            .catch(() => {
                this.props.updateCartItemsStop();
                toast.error("Error deleting all cart items!")
            });
    }

    deleteCartItem(cartItemId: string): void {
        this.props.updateCartItemsStart();
        cartService.deleteItem(cartItemId)
            .then(() => {
                this.props.deleteCartItem(cartItemId);
                this.props.updateCartItemsStop();
                toast.success("Deleted!");
            })
            .catch(() => {
                this.props.updateCartItemsStop();
                toast.error("Error deleting the cart item!")
            });
    }

    renderCartItems() {
        const { cartItems, updatingCartItems, loadingCartItems } = this.props;

        return (
            <Paper>
                {loadingCartItems ?
                    <Loader active inline='centered' />
                    :
                    <>
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
                                    {cartItems.map((cartItem) =>
                                        <TableRow key={cartItem.id}>
                                            <TableCell>{cartItem.name}</TableCell>
                                            <TableCell>
                                                <ButtonError
                                                    disabled={updatingCartItems}
                                                    onClick={() => this.deleteCartItem(cartItem.id)}
                                                >
                                                    DELETE
                                                </ButtonError>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            :
                            <Typography variant="h5">
                                Cart is empty
                            </Typography>
                        }
                    </>
                }
            </Paper>
        );
    }

    render() {
        return (
            <>
                <Title>Cart</Title>
                {this.props.cartItems.length > 0 &&
                    <div>
                        <ButtonError height="48" onClick={() => this.deleteAllCartItems()}>
                            Delete all items
                        </ButtonError>
                    </div>
                }
                {this.renderCartItems()}
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        cartItems: state.cart.cartItems,
        loadingCartItems: state.cart.loadingCartItems,
        updatingCartItems: state.cart.updatingCartItems
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchCartItemsStart: bindActionCreators(cartActions.fetchCartItemsStart, dispatch),
        fetchCartItemsStop: bindActionCreators(cartActions.fetchCartItemsStop, dispatch),
        updateCartItemsStart: bindActionCreators(cartActions.updateCartItemsStart, dispatch),
        updateCartItemsStop: bindActionCreators(cartActions.updateCartItemsStop, dispatch),
        updateCartItems: bindActionCreators(cartActions.updateCartItems, dispatch),
        deleteCartItem: bindActionCreators(cartActions.deleteCartItem, dispatch),
        deleteAllCartItems: bindActionCreators(cartActions.deleteAllCartItems, dispatch)
    };
};

const CartView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(CartViewBase);

export default CartView;