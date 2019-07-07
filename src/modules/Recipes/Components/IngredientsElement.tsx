import React, { PureComponent } from 'react';
import { IngredientItem } from '../models';
import { getNumericQuantity, getIngredientTypeText } from '../helper';
import { Table, TableBody, Divider, TableRow, TableCell, Button, Typography, Paper } from '@material-ui/core';
import * as recipeActions from '../../../store/recipes/recipeActions';
import * as cartActions from '../../../store/cart/cartActions';
import { recipeService } from '../../../services/recipeService';
import { toast } from 'react-toastify';
import AddIngredientItemForm from './AddIngredientItemForm';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Loader } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { cartService } from '../../../services/cartService';
import { Ingredient } from '../../Ingredients/models';
import { ButtonPrimary, ButtonError } from '../../../layout/Styles/Buttons';
import { ApplicationState } from '../../..';

interface OwnProps {
    id: string;
    editing: boolean;
}

type StateProps = {
    auth: any;
    ingredientItems: IngredientItem[];
    cartItems: Ingredient[];
    loadingIngredientItems: boolean;
    updatingIngredientItems: boolean;
}

type DispatchProps = {
    fetchIngredientItemsStart: typeof recipeActions.fetchIngredientItemsStart;
    fetchIngredientItemsStop: typeof recipeActions.fetchIngredientItemsStop;
    fetchCartItemsStart: typeof cartActions.fetchCartItemsStart;
    fetchCartItemsStop: typeof cartActions.fetchCartItemsStop;
    updateIngredientItemsStart: typeof recipeActions.updateIngredientItemsStart;
    updateIngredientItemsStop: typeof recipeActions.updateIngredientItemsStop;
    updateIngredientItems: typeof recipeActions.updateIngredientItems;
    updateCartItems: typeof cartActions.updateCartItems;
    deleteIngredientItem: typeof recipeActions.deleteIngredientItem;
    addCartItem: typeof cartActions.addCartItem;
}

type Props = OwnProps & StateProps & RouteComponentProps & DispatchProps;

class IngredientsElementBase extends PureComponent<Props> {
    componentDidMount() {
        const { id, ingredientItems, fetchIngredientItemsStart, fetchIngredientItemsStop,
            updateIngredientItems, cartItems, fetchCartItemsStart, fetchCartItemsStop, updateCartItems } = this.props;

        fetchIngredientItemsStart()
        recipeService.getIngredientItems(id)
            .then((ingredientItems) => {
                if (ingredientItems.length > 0) {
                    updateIngredientItems(ingredientItems);
                }
                fetchIngredientItemsStop();
            })
            .catch(() => {
                fetchIngredientItemsStop();
                toast.error("Error fetching the ingredient items!");
            })


        if (cartItems.length == 0) {
            fetchCartItemsStart()
            cartService.getCartItems("TODO")
                .then((cartItems) => {
                    if (cartItems.length > 0) {
                        updateCartItems(cartItems);
                    }
                    fetchCartItemsStop();
                })
                .catch(() => {
                    fetchCartItemsStop();
                    toast.error("Error fetching the cart items!");
                })
        }
    }

    deleteIngredientItem = (ingredientItemId: string) => {
        const { id } = this.props;

        this.props.updateIngredientItemsStart();
        recipeService.deleteIngredientItem(id, ingredientItemId)
            .then(() => {
                this.props.deleteIngredientItem(ingredientItemId);
                this.props.updateIngredientItemsStop();
                toast.success("Deleted!");
            })
            .catch(() => {
                this.props.updateIngredientItemsStop();
                toast.error("Error deleting the ingredient item!");
            });
    }

    addCartItem = (ingredientItem: IngredientItem) => {
        const { auth } = this.props;
        
        cartService.addItem(auth.uid, ingredientItem.name)
            .then((ingredient) => {
                this.props.addCartItem(ingredient);
                toast.success(`Added ${ingredient.name} to cart!`);
            })
            .catch(() => {
                toast.error("Error adding the ingredient to the cart.")
            })
    }

    renderAddToCartButton = (ingredientItem: IngredientItem) => {
        const inCart = this.props.cartItems.find(c => c.name === ingredientItem.name);

        if (inCart) {
            return (
                <ButtonPrimary disabled={true}>
                    Already in cart
                </ButtonPrimary>
            )
        }

        return (
            <ButtonPrimary onClick={() => this.addCartItem(ingredientItem)}>
                Add to cart
            </ButtonPrimary>
        )
    }

    render() {
        const { ingredientItems, editing, loadingIngredientItems, updatingIngredientItems } = this.props;

        return (
            <>
                <Typography variant="h5">Ingredients ({ingredientItems.length})</Typography>
                <Paper>
                    {loadingIngredientItems ?
                        <Loader active inline='centered' />
                        :
                        <Table>
                            <TableBody>
                                {ingredientItems.map((ingredientItem, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Typography>
                                                    {getNumericQuantity(ingredientItem.quantity)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {getIngredientTypeText(ingredientItem.type)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {ingredientItem.name.toLowerCase()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {editing ?
                                                    <ButtonError
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => this.deleteIngredientItem(ingredientItem.id)}
                                                        disabled={updatingIngredientItems}
                                                    >
                                                        Delete ingredient
                                                    </ButtonError>
                                                    :
                                                    this.renderAddToCartButton(ingredientItem)
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                }
                            </TableBody>
                        </Table>
                    }
                </Paper>
                <Divider />
                <AddIngredientItemForm editing={editing} />
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    auth: state.firebase.auth,
    ingredientItems: state.recipe.ingredientItems,
    cartItems: state.cart.cartItems,
    loadingIngredientItems: state.recipe.loadingIngredientItems,
    updatingIngredientItems: state.recipe.updatingIngredientItems
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchIngredientItemsStart: bindActionCreators(recipeActions.fetchIngredientItemsStart, dispatch),
    fetchIngredientItemsStop: bindActionCreators(recipeActions.fetchIngredientItemsStop, dispatch),
    fetchCartItemsStart: bindActionCreators(cartActions.fetchCartItemsStart, dispatch),
    fetchCartItemsStop: bindActionCreators(cartActions.fetchCartItemsStop, dispatch),
    updateIngredientItemsStart: bindActionCreators(recipeActions.updateIngredientItemsStart, dispatch),
    updateIngredientItemsStop: bindActionCreators(recipeActions.updateIngredientItemsStop, dispatch),
    updateIngredientItems: bindActionCreators(recipeActions.updateIngredientItems, dispatch),
    updateCartItems: bindActionCreators(cartActions.updateCartItems, dispatch),
    deleteIngredientItem: bindActionCreators(recipeActions.deleteIngredientItem, dispatch),
    addCartItem: bindActionCreators(cartActions.addCartItem, dispatch)
});

const IngredientsElement = compose(
    connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)
)(IngredientsElementBase);

export default IngredientsElement;