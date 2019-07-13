import { Button, Divider, Paper, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { Loader } from "semantic-ui-react";
import { ApplicationState } from "../../..";
import { ButtonError, ButtonPrimary } from "../../../layout/Styles/Buttons";
import * as cartActions from "../../../store/cart/cartActions";
import * as recipeActions from "../../../store/recipes/recipeActions";
import { Ingredient } from "../../Ingredients/models";
import { getIngredientTypeText, getNumericQuantity } from "../helper";
import { IngredientItem } from "../models";
import AddIngredientItemForm from "./AddIngredientItemForm";
import { RecipeService } from "../../../services/RecipeService";
import { CartService } from "../../../services/CartService";

interface OwnProps {
    id: string;
    editing: boolean;
}

interface StateProps {
    auth: any;
    ingredientItems: IngredientItem[];
    cartItems: Ingredient[];
    loadingIngredientItems: boolean;
    updatingIngredientItems: boolean;
}

interface DispatchProps {
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
    public componentDidMount() {
        const { id, fetchIngredientItemsStart, fetchIngredientItemsStop, auth,
            updateIngredientItems, cartItems, fetchCartItemsStart, fetchCartItemsStop, updateCartItems } = this.props;

        fetchIngredientItemsStart();
        RecipeService.getIngredientItems(id)
            .then((ingredientItems) => {
                if (ingredientItems.length > 0) {
                    updateIngredientItems(ingredientItems);
                }
                fetchIngredientItemsStop();
            })
            .catch((error) => {
                fetchIngredientItemsStop();
                toast.error("Error fetching the ingredient items!");
            });

        if (cartItems.length === 0) {
            fetchCartItemsStart();
            CartService.getCartItems(auth.uid)
                .then((cartItems) => {
                    if (cartItems.length > 0) {
                        updateCartItems(cartItems);
                    }
                    fetchCartItemsStop();
                })
                .catch(() => {
                    fetchCartItemsStop();
                    toast.error("Error fetching the cart items!");
                });
        }
    }

    public deleteIngredientItem = (ingredientItemId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        const { id } = this.props;

        this.props.updateIngredientItemsStart();
        RecipeService.deleteIngredientItem(id, ingredientItemId)
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

    public addCartItem = (ingredientItem: IngredientItem) => (event: React.MouseEvent<HTMLButtonElement>) => {
        const { auth } = this.props;

        CartService.addItem(auth.uid, ingredientItem.name)
            .then((ingredient) => {
                this.props.addCartItem(ingredient);
                toast.success(`Added ${ingredient.name} to cart!`);
            })
            .catch(() => {
                toast.error("Error adding the ingredient to the cart.");
            });
    }

    public renderAddToCartButton = (ingredientItem: IngredientItem) => {
        const inCart = this.props.cartItems.find((c) => c.name === ingredientItem.name);

        if (inCart) {
            return (
                <ButtonPrimary disabled={true}>
                    Already in cart
                </ButtonPrimary>
            );
        }

        return (
            <ButtonPrimary onClick={this.addCartItem(ingredientItem)}>
                Add to cart
            </ButtonPrimary>
        );
    }

    public render() {
        const { ingredientItems, editing, loadingIngredientItems, updatingIngredientItems } = this.props;

        return (
            <>
                <Typography variant="h5">Ingredients ({ingredientItems.length})</Typography>
                <Paper>
                    {loadingIngredientItems ?
                        <Loader active={true} inline="centered" />
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
                                                        onClick={this.deleteIngredientItem(ingredientItem.id)}
                                                        disabled={updatingIngredientItems}
                                                    >
                                                        Delete ingredient
                                                    </ButtonError>
                                                    :
                                                    this.renderAddToCartButton(ingredientItem)
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
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
    updatingIngredientItems: state.recipe.updatingIngredientItems,
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
    addCartItem: bindActionCreators(cartActions.addCartItem, dispatch),
});

const IngredientsElement = compose(
    connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps),
)(IngredientsElementBase);

export default IngredientsElement;
