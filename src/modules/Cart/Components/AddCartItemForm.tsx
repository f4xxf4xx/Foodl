import { Box, FormLabel, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RouteProps } from "react-router-dom";
import Creatable from "react-select/lib/Creatable";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledPaper } from "../../../layout/Styles/Sections";
import { cartService } from "../../../services/cartService";
import { ingredientService } from "../../../services/ingredientService";
import * as cartActions from "../../../store/cart/cartActions";
import * as ingredientActions from "../../../store/ingredients/ingredientActions";
import { Ingredient } from "../../Ingredients/models";

interface OwnProps {
    updating: boolean;
}

interface StateProps {
    ingredients: Ingredient[];
    auth: any;
}

interface State {
    currentSelectIngredient: any;
}

interface DispatchProps {
    addCartItem: typeof cartActions.addCartItem;
    updateCartItemsStart: typeof cartActions.updateCartItemsStart;
    updateCartItemsStop: typeof cartActions.updateCartItemsStop;
    addIngredient: typeof ingredientActions.addIngredient;
    fetchIngredientsStart: typeof ingredientActions.fetchIngredientsStart;
    fetchIngredientsStop: typeof ingredientActions.fetchIngredientsStop;
    updateIngredients: typeof ingredientActions.updateIngredients;
}

type Props = OwnProps & DispatchProps & RouteProps & StateProps;

class AddCartItemFormBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentSelectIngredient: null,
        };
    }

    public componentDidMount() {
        if (this.props.ingredients.length == 0) {
            this.props.fetchIngredientsStart();
            ingredientService.getIngredients()
                .then((ingredients) => {
                    this.props.updateIngredients(ingredients);
                    this.props.fetchIngredientsStop();
                })
                .catch(() => {
                    this.props.fetchIngredientsStop();
                    toast.error("Error fetching the ingredients!");
                });
        }
    }

    public addIngredient = () => {
        const { currentSelectIngredient } = this.state;
        const { ingredients, auth } = this.props;

        if (!currentSelectIngredient) {
            return;
        }

        if (!ingredients.find((i) => i.name === currentSelectIngredient.label)) {
            ingredientService.addIngredient(currentSelectIngredient.label)
                .then((ingredient) => {
                    if (ingredient) {
                        this.props.addIngredient(ingredient);
                    }
                })
                .catch(() => {
                    toast.error("Error adding the ingredient.");
                });
        }

        this.props.updateCartItemsStart();
        cartService.addItem(auth.uid, currentSelectIngredient.label)
            .then((ingredient) => {
                if (ingredient) {
                    this.props.updateCartItemsStop();
                    this.props.addCartItem(ingredient);
                    toast.success("Added!");
                    this.setState({
                        currentSelectIngredient: null,
                    });
                } else {
                    this.props.updateCartItemsStop();
                    toast.warn("Item already in cart!");
                }
            })
            .catch(() => {
                this.props.updateCartItemsStop();
                toast.error("Error adding the ingredient.");
            });
    }

    public handleKeyPress = (event) => {
        if (event.charCode === 13) {
            this.addIngredient();
        }
    }

    public updateFormName = (e: any) => {
        this.setState({
            currentSelectIngredient: e,
        });
    }

    public render() {
        const { updating, ingredients } = this.props;
        const { currentSelectIngredient } = this.state;
        const ingredientOptions = ingredients ? ingredients.map((ingredient) => {
            return {
                value: ingredient.id,
                label: ingredient.name,
            };
        }) : [];

        return (
            <StyledPaper>
                <Typography variant="h6">New cart item</Typography>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <Box>
                        <Creatable
                            id="input-ingredient"
                            options={ingredientOptions}
                            value={currentSelectIngredient}
                            onChange={this.updateFormName}
                            onKeyPress={this.handleKeyPress}
                        />
                    </Box>
                    <ButtonPrimary
                        onClick={this.addIngredient}
                        disabled={updating}
                    >
                        Add
                    </ButtonPrimary>
                </form>
            </StyledPaper>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    ingredients: state.ingredients.ingredients,
    auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addCartItem: bindActionCreators(cartActions.addCartItem, dispatch),
    updateCartItemsStart: bindActionCreators(cartActions.updateCartItemsStart, dispatch),
    updateCartItemsStop: bindActionCreators(cartActions.updateCartItemsStop, dispatch),
    addIngredient: bindActionCreators(ingredientActions.addIngredient, dispatch),
    fetchIngredientsStart: bindActionCreators(ingredientActions.fetchIngredientsStart, dispatch),
    fetchIngredientsStop: bindActionCreators(ingredientActions.fetchIngredientsStop, dispatch),
    updateIngredients: bindActionCreators(ingredientActions.updateIngredients, dispatch),
});

const AddCartItemForm = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(AddCartItemFormBase);

export default AddCartItemForm;
