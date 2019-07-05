import React, { PureComponent } from "react";
import { RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { compose, bindActionCreators, Dispatch } from "redux";
import * as cartActions from "../../../store/cart/cartActions";
import { cartService } from "../../../services/cartService";
import { TableHead, TableRow, Table, TableCell, TableBody, Paper, Typography, FormLabel, TextField } from "@material-ui/core";
import { Loader } from 'semantic-ui-react'
import { Ingredient } from "../../Ingredients/models";
import { ButtonError } from "../../Layout/Styles/Buttons";
import { Title } from "../../Layout/Styles/Sections";
import AddCartItemForm from "./AddCartItemForm";
import { ApplicationState } from "../../..";

type StateProps = {
    cartItems: Ingredient[];
    loadingCartItems: boolean;
    updatingCartItems: boolean;
    auth: any;
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
        const { auth } = this.props;

        if (auth.isLoaded && !auth.isEmpty) {
            this.fetchCartItems();
        }
    }

    componentDidUpdate(prevProps: Props) {
        const { auth } = this.props;

        if (auth.isLoaded !== prevProps.auth.isLoaded && !auth.isEmpty) {
            this.fetchCartItems();
        }
    }

    fetchCartItems() {
        const { auth } = this.props;

        this.props.fetchCartItemsStart();
        return cartService.getCartItems(auth.uid)
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
        const { auth } = this.props;

        this.props.updateCartItemsStart();
        cartService.deleteItem(auth.uid, cartItemId)
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
        const { cartItems, updatingCartItems, loadingCartItems, auth } = this.props;

        return (
            <Paper>
                {(loadingCartItems || !auth.isLoaded) ?
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
                                    {cartItems.map((cartItem, index) =>
                                        <TableRow key={index}>
                                            <TableCell>{cartItem.name}</TableCell>
                                            <TableCell>
                                                <ButtonError
                                                    disabled={updatingCartItems}
                                                    onClick={() => this.deleteCartItem(cartItem.name)}
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
        const { auth } = this.props;

        return (
            <>
                <Title>Cart</Title>
                {auth.isLoaded &&
                    <>
                        <AddCartItemForm updating={this.props.updatingCartItems} />
                        {this.props.cartItems.length > 0 &&
                            <div>
                                <ButtonError height="48" onClick={() => this.deleteAllCartItems()}>
                                    Delete all items
                                </ButtonError>
                            </div>
                        }
                    </>
                }
                {this.renderCartItems()}
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    cartItems: state.cart.cartItems,
    loadingCartItems: state.cart.loadingCartItems,
    updatingCartItems: state.cart.updatingCartItems,
    auth: state.firebase.auth
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchCartItemsStart: bindActionCreators(cartActions.fetchCartItemsStart, dispatch),
    fetchCartItemsStop: bindActionCreators(cartActions.fetchCartItemsStop, dispatch),
    updateCartItemsStart: bindActionCreators(cartActions.updateCartItemsStart, dispatch),
    updateCartItemsStop: bindActionCreators(cartActions.updateCartItemsStop, dispatch),
    updateCartItems: bindActionCreators(cartActions.updateCartItems, dispatch),
    deleteCartItem: bindActionCreators(cartActions.deleteCartItem, dispatch),
    deleteAllCartItems: bindActionCreators(cartActions.deleteAllCartItems, dispatch)
});

const CartView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(CartViewBase);

export default CartView;