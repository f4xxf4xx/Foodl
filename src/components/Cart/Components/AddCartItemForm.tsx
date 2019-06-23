import React, { PureComponent } from "react";
import { RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { compose, bindActionCreators, Dispatch } from "redux";
import * as cartActions from "../cartActions";
import * as ingredientActions from "../../Ingredients/ingredientActions";
import { cartService } from "../cartService";
import { Typography, FormLabel, TextField, Paper, Box, Grid } from "@material-ui/core";
import { ButtonPrimary } from "../../Layout/Styles/Buttons";
import { StyledPaper } from "../../Layout/Styles/Sections";
import { Ingredient } from "../../Ingredients/models";
import { ingredientService } from "../../Ingredients/ingredientService";
import Creatable from 'react-select/lib/Creatable';

type OwnProps = {
    updating: boolean;
};

type StateProps = {
    ingredients: Ingredient[];
}

type State = {
    newIngredientName: string;
    currentSelectIngredient: any;
};

type DispatchProps = {
    addCartItem: typeof cartActions.addCartItem;
    updateCartItemsStart: typeof cartActions.updateCartItemsStart;
    updateCartItemsStop: typeof cartActions.updateCartItemsStop;
    addIngredient: typeof ingredientActions.addIngredient;
    fetchIngredientsStart: typeof ingredientActions.fetchIngredientsStart;
    fetchIngredientsStop: typeof ingredientActions.fetchIngredientsStop;
    updateIngredients: typeof ingredientActions.updateIngredients;
};

type Props = OwnProps & DispatchProps & RouteProps & StateProps;

class AddCartItemFormBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newIngredientName: "",
            currentSelectIngredient: null
        };
    }

    componentDidMount() {
        if (this.props.ingredients.length == 0) {
            this.props.fetchIngredientsStart()
            ingredientService.getIngredients()
                .then(ingredients => {
                    this.props.updateIngredients(ingredients);
                    this.props.fetchIngredientsStop();
                })
                .catch(() => {
                    this.props.fetchIngredientsStop();
                    toast.error("Error fetching the ingredients!")
                })
        }
    }

    addIngredient = () => {
        const { newIngredientName } = this.state;
        const { ingredients } = this.props;

        if (newIngredientName === "") {
            return;
        }

        if (!ingredients.find(i => i.name === newIngredientName)) {
            ingredientService.addIngredient(newIngredientName)
                .then((ingredient) => {
                    this.props.addIngredient(ingredient);
                })
                .catch(() => {
                    toast.error("Error adding the ingredient.")
                })
        }

        this.props.updateCartItemsStart();
        cartService.addItem(newIngredientName)
            .then((ingredient) => {
                this.props.updateCartItemsStop();
                this.props.addCartItem(ingredient);
                toast.success("Added!");
                this.setState({
                    newIngredientName: ""
                });
            })
            .catch(() => {
                this.props.updateCartItemsStop();
                toast.error("Error adding the ingredient.")
            })
    }

    handleKeyPress = (event) => {
        if (event.charCode === 13) {
            this.addIngredient();
        }
    }

    updateFormName = (e: any) => {
        this.setState({
            newIngredientName: e.label,
            currentSelectIngredient: e
        });
    }

    render() {
        const { updating, ingredients } = this.props;
        const { currentSelectIngredient, newIngredientName } = this.state;
        const ingredientOptions = ingredients ? ingredients.map(ingredient => {
            return {
                value: ingredient.id,
                label: ingredient.name
            }
        }) : [];

        return (
            <StyledPaper>
                <Typography variant="h6">New cart item</Typography>
                <form onSubmit={e => { e.preventDefault(); }}>
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

const mapStateToProps = (state: any) => {
    return {
        ingredients: state.ingredients.ingredients,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addCartItem: bindActionCreators(cartActions.addCartItem, dispatch),
        updateCartItemsStart: bindActionCreators(cartActions.updateCartItemsStart, dispatch),
        updateCartItemsStop: bindActionCreators(cartActions.updateCartItemsStop, dispatch),
        addIngredient: bindActionCreators(ingredientActions.addIngredient, dispatch)
    };
};

const AddCartItemForm = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(AddCartItemFormBase);

export default AddCartItemForm;