import { FormLabel, TextField, Typography } from "@material-ui/core";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import Creatable from "react-select/lib/Creatable";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { InputWrapper } from "../../../layout/Styles/Forms";
import { StyledPaper } from "../../../layout/Styles/Sections";
import { ingredientService } from "../../../services/ingredientService";
import { recipeService } from "../../../services/recipeService";
import * as ingredientActions from "../../../store/ingredients/ingredientActions";
import * as recipeActions from "../../../store/recipes/recipeActions";
import { Ingredient } from "../../Ingredients/models";
import { getIngredientTypeOptions } from "../helper";
import { IngredientItem, Recipe } from "../models";

interface OwnProps {
    editing: boolean;
}

interface StateProps {
    recipe: Recipe;
    ingredients: Ingredient[];
    loadingIngredients: boolean;
}

interface State {
    newIngredientItem: IngredientItem;
    currentSelectIngredient: any;
    currentSelectType: any;
}

interface DispatchProps {
    updateIngredientItemsStart: typeof recipeActions.updateIngredientItemsStart;
    updateIngredientItemsStop: typeof recipeActions.updateIngredientItemsStop;
    updateIngredientItems: typeof recipeActions.updateIngredientItems;
    addIngredientItem: typeof recipeActions.addIngredientItem;
    updateIngredients: typeof ingredientActions.updateIngredients;
    fetchIngredientsStart: typeof ingredientActions.fetchIngredientsStart;
    fetchIngredientsStop: typeof ingredientActions.fetchIngredientsStop;
    addIngredient: typeof ingredientActions.addIngredient;
}

type Props = OwnProps & StateProps & DispatchProps;

class AddIngredientItemFormBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newIngredientItem: {
                name: "",
                quantity: "",
                type: "",
            },
            currentSelectIngredient: null,
            currentSelectType: null,
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

    public updateFormName = (e: any) => {
        const { newIngredientItem } = this.state;
        this.setState({
            newIngredientItem: { ...newIngredientItem, name: e.label },
            currentSelectIngredient: e,
        });
    }

    public updateFormQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { newIngredientItem } = this.state;
        this.setState({ newIngredientItem: { ...newIngredientItem, quantity: e.target.value } });
    }

    public updateFormType = (e: any) => {
        const { newIngredientItem } = this.state;
        this.setState({
            newIngredientItem: { ...newIngredientItem, type: e.value },
            currentSelectType: e,
        });
    }

    public addIngredient = () => {
        const { newIngredientItem } = this.state;
        const { ingredients, recipe } = this.props;

        if (newIngredientItem.name === ""
            || newIngredientItem.quantity === ""
            || newIngredientItem.type === "") {
            return false;
        }

        if (!ingredients.find((i) => i.name === newIngredientItem.name)) {
            ingredientService.addIngredient(newIngredientItem.name)
                .then((ingredient) => {
                    if (ingredient) {
                        this.props.addIngredient(ingredient);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Error adding the ingredient.");
                });
        }

        this.props.updateIngredientItemsStart();
        recipeService.addIngredientItem(recipe.id, newIngredientItem)
            .then((ingredientItem) => {
                this.props.addIngredientItem(ingredientItem);
                this.props.updateIngredientItemsStop();
                this.setState({
                    newIngredientItem: {
                        ...newIngredientItem, name: "",
                        quantity: "", type: "",
                    },
                    currentSelectIngredient: null,
                    currentSelectType: null,
                });
                toast.success("Added!");
            })
            .catch(() => {
                this.props.updateIngredientItemsStop();
                toast.error("Error adding the ingredient item!");
            });
    }

    public render() {
        const { editing, ingredients } = this.props;
        const { newIngredientItem, currentSelectIngredient, currentSelectType } = this.state;

        const ingredientOptions = ingredients ? ingredients.map((ingredient) => {
            return {
                value: ingredient.id,
                label: ingredient.name,
            };
        }) : [];

        return (
            <>
                {editing &&
                    <StyledPaper>
                        <form onSubmit={(e) => { e.preventDefault(); }}>
                            <Typography variant="h6">
                                Add ingredient
                            </Typography>
                            <InputWrapper>
                                <TextField
                                    id="input-quantity"
                                    label="Quantity"
                                    type="text"
                                    value={newIngredientItem.quantity}
                                    onChange={this.updateFormQuantity}
                                    fullWidth={true}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <FormLabel htmlFor="input-type">
                                    Type
                                </FormLabel>
                                <Select
                                    id="input-type"
                                    label="type"
                                    options={getIngredientTypeOptions()}
                                    value={currentSelectType}
                                    onChange={this.updateFormType}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <FormLabel htmlFor="input-ingredient">
                                    Ingredient
                                </FormLabel>
                                <Creatable
                                    id="input-ingredient"
                                    options={ingredientOptions}
                                    value={currentSelectIngredient}
                                    onChange={this.updateFormName}
                                />
                                <ButtonPrimary
                                    onClick={this.addIngredient}
                                >
                                    Add
                                </ButtonPrimary>
                            </InputWrapper>
                        </form>
                    </StyledPaper>
                }
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    recipe: state.recipe.recipe,
    ingredients: state.ingredients.ingredients,
    loadingIngredients: state.ingredients.loadingIngredients,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateIngredientItemsStart: bindActionCreators(recipeActions.updateIngredientItemsStart, dispatch),
    updateIngredientItemsStop: bindActionCreators(recipeActions.updateIngredientItemsStop, dispatch),
    updateIngredientItems: bindActionCreators(recipeActions.updateIngredientItems, dispatch),
    addIngredientItem: bindActionCreators(recipeActions.addIngredientItem, dispatch),
    updateIngredients: bindActionCreators(ingredientActions.updateIngredients, dispatch),
    fetchIngredientsStart: bindActionCreators(ingredientActions.fetchIngredientsStart, dispatch),
    fetchIngredientsStop: bindActionCreators(ingredientActions.fetchIngredientsStop, dispatch),
    addIngredient: bindActionCreators(ingredientActions.addIngredient, dispatch),
});

const AddIngredientItemForm = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(AddIngredientItemFormBase);

export default AddIngredientItemForm;
