import { Divider, Table, TableBody, TableCell, TableRow, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { Loader } from "semantic-ui-react";
import { ApplicationState } from "../../..";
import { ButtonError, ButtonPrimary, ButtonSecondary } from "../../../layout/Styles/Buttons";
import * as cartActions from "../../../store/cart/cartActions";
import * as recipeActions from "../../../store/recipes/recipeActions";
import { Ingredient } from "../../Ingredients/models";
import { getIngredientQuantity, getIngredientName } from "../helper";
import { IngredientItem, Recipe } from "../models";
import AddIngredientItemForm from "./AddIngredientItemForm";
import { RecipeDbHelper } from "../../../repositories/RecipeDbHelper";
import { CartDbHelper } from "../../../repositories/CartDbHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

interface OwnProps {
    id: string;
    editing: boolean;
    ingredientGroups: string[];
}

interface State {
    openedModal: boolean;
    currentRemoveGroup: string;
}

interface StateProps {
    recipe: Recipe;
    auth: any;
    ingredientItems: IngredientItem[];
    cartItems: Ingredient[];
    loadingIngredientItems: boolean;
    updatingIngredientItems: boolean;
}

interface DispatchProps {
    fetchIngredientItemsStart: typeof recipeActions.fetchIngredientItemsStart;
    fetchIngredientItemsStop: typeof recipeActions.fetchIngredientItemsStop;
    //fetchCartItemsStart: typeof cartActions.fetchCartItemsStart;
    //fetchCartItemsStop: typeof cartActions.fetchCartItemsStop;
    updateIngredientItemsStart: typeof recipeActions.updateIngredientItemsStart;
    updateIngredientItemsStop: typeof recipeActions.updateIngredientItemsStop;
    updateIngredientItems: typeof recipeActions.updateIngredientItems;
    updateCartItems: typeof cartActions.updateCartItems;
    deleteIngredientItem: typeof recipeActions.deleteIngredientItem;
    addCartItem: typeof cartActions.addCartItem;
    updateRecipe: typeof recipeActions.updateRecipe;
}

type Props = OwnProps & StateProps & RouteComponentProps & DispatchProps;

class IngredientsElementBase extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            openedModal: false,
            currentRemoveGroup: null
        };
    }

    public componentDidMount() {
        const { id, fetchIngredientItemsStart, fetchIngredientItemsStop, auth,
            updateIngredientItems, cartItems, updateCartItems } = this.props;

        fetchIngredientItemsStart();
        RecipeDbHelper.getIngredients(id)
            .then((ingredientItems) => {
                if (ingredientItems.length > 0) {
                    updateIngredientItems(ingredientItems);
                }
                fetchIngredientItemsStop();
            })
            .catch(() => {
                fetchIngredientItemsStop();
                toast.error("Error fetching the ingredient items!");
            });

        if (cartItems.length === 0) {
            //fetchCartItemsStart();
            CartDbHelper.getCartItems(auth.uid)
                .then((cartItems) => {
                    if (cartItems.length > 0) {
                        updateCartItems(cartItems);
                    }
                    //fetchCartItemsStop();
                })
                .catch(() => {
                    //fetchCartItemsStop();
                    toast.error("Error fetching the cart items!");
                });
        }
    }

    public deleteIngredientItem = (ingredientItemId: string) => () => {
        const { id } = this.props;

        this.props.updateIngredientItemsStart();
        RecipeDbHelper.deleteIngredientItem(id, ingredientItemId)
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

    public addCartItem = (ingredientItem: IngredientItem) => () => {
        const { auth } = this.props;

        CartDbHelper.addItem(auth.uid, ingredientItem.name)
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
                <ButtonSecondary width="20" disabled={true}>
                    <FontAwesomeIcon size="lg" icon={faShoppingCart} />
                </ButtonSecondary>
            );
        }

        return (
            <ButtonPrimary width="20" onClick={this.addCartItem(ingredientItem)}>
                <FontAwesomeIcon size="lg" icon={faCartPlus} />
            </ButtonPrimary>
        );
    }

    public deleteIngredientGroup = () => {
        const { id, recipe } = this.props;
        const { currentRemoveGroup } = this.state;

        this.props.updateIngredientItemsStart();
        RecipeDbHelper.deleteIngredientGroup(id, currentRemoveGroup)
            .then((groups) => {
                this.props.updateRecipe({ ...recipe, ingredientGroups: groups });
                RecipeDbHelper.deleteIngredientOfGroup(id, currentRemoveGroup)
                    .then(ingredientItems => {
                        this.props.updateIngredientItems(ingredientItems);
                        this.props.updateIngredientItemsStop();
                        this.setState({ openedModal: false, currentRemoveGroup: null });
                        toast.success("Deleted!");
                    })
            })
            .catch(() => {
                this.props.updateIngredientItemsStop();
                toast.error("Error deleting the ingredient group!");
            });
    }

    public handleOpenModal = (group: string) => () => {
        this.setState({ openedModal: true, currentRemoveGroup: group });
    }

    public handleCloseModal = () => {
        this.setState({ openedModal: false, currentRemoveGroup: null });
    }

    public renderIngredientGroup = (groupsLength: number, group: string, index: number) => {
        const { ingredientItems, editing, updatingIngredientItems } = this.props;
        const { openedModal } = this.state;
        const groupIngredientItems = ingredientItems.filter(ingredientItem => ingredientItem.group === group);

        if (!groupIngredientItems || groupIngredientItems.length === 0) {
            return null;
        }

        return (
            <React.Fragment key={index}>
                <Grid justify="space-between" container={true}>
                    {groupsLength > 0 &&
                        <Grid item={true}>
                            <Typography variant="h6">Other</Typography>
                        </Grid>
                    }
                    <Grid item={true}>
                        {editing && group && <ButtonSecondary onClick={this.handleOpenModal(group)} color="secondary">Delete group</ButtonSecondary>}
                    </Grid>
                </Grid>
                <Table>
                    <TableBody>
                        {groupIngredientItems.map((ingredientItem, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography>
                                            {getIngredientQuantity(ingredientItem)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {getIngredientName(ingredientItem)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {editing ?
                                            <ButtonError
                                                onClick={this.deleteIngredientItem(ingredientItem.id)}
                                                disabled={updatingIngredientItems}
                                                width="20"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </ButtonError>
                                            :
                                            this.renderAddToCartButton(ingredientItem)
                                        }
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Dialog
                    open={openedModal}
                    onClose={this.handleCloseModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete all ingredients in the group?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deleting this ingredient group will also delete all ingredients in the group.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <ButtonSecondary color="secondary" onClick={this.handleCloseModal} autoFocus>
                            Disagree
                        </ButtonSecondary>
                        <ButtonError onClick={this.deleteIngredientGroup}>
                            Delete
                        </ButtonError>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }

    public render() {
        const { ingredientItems, editing, loadingIngredientItems, ingredientGroups } = this.props;

        return (
            <>
                <Typography variant="h5">Ingredients ({ingredientItems.length})</Typography>
                {loadingIngredientItems ?
                    <Loader active={true} inline="centered" />
                    :
                    <>
                        {ingredientGroups && ingredientGroups.map((ingredientGroup, index) => {
                            return this.renderIngredientGroup(ingredientGroups.length, ingredientGroup, index);
                        })}
                        {ingredientGroups && this.renderIngredientGroup(ingredientGroups.length, null, null)}
                    </>
                }
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
    recipe: state.recipe.recipe,
    loadingIngredientItems: state.recipe.loadingIngredientItems,
    updatingIngredientItems: state.recipe.updatingIngredientItems,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchIngredientItemsStart: bindActionCreators(recipeActions.fetchIngredientItemsStart, dispatch),
    fetchIngredientItemsStop: bindActionCreators(recipeActions.fetchIngredientItemsStop, dispatch),
    //fetchCartItemsStart: bindActionCreators(cartActions.fetchCartItemsStart, dispatch),
    //fetchCartItemsStop: bindActionCreators(cartActions.fetchCartItemsStop, dispatch),
    updateIngredientItemsStart: bindActionCreators(recipeActions.updateIngredientItemsStart, dispatch),
    updateIngredientItemsStop: bindActionCreators(recipeActions.updateIngredientItemsStop, dispatch),
    updateIngredientItems: bindActionCreators(recipeActions.updateIngredientItems, dispatch),
    updateCartItems: bindActionCreators(cartActions.updateCartItems, dispatch),
    deleteIngredientItem: bindActionCreators(recipeActions.deleteIngredientItem, dispatch),
    addCartItem: bindActionCreators(cartActions.addCartItem, dispatch),
    updateRecipe: bindActionCreators(recipeActions.updateRecipe, dispatch)
});

const IngredientsElement = compose(
    connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps),
)(withRouter(IngredientsElementBase));

export default IngredientsElement;
