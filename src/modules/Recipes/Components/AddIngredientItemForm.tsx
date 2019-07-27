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
import * as ingredientActions from "../../../store/ingredients/ingredientActions";
import * as recipeActions from "../../../store/recipes/recipeActions";
import { Ingredient } from "../../Ingredients/models";
import { IngredientItem, Recipe } from "../models";
import { IngredientService } from "../../../services/IngredientService";
import { RecipeService } from "../../../services/RecipeService";
import { IngredientType, IngredientPrepType } from "../constants";

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
    currentPrepType: any;
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
                prepType: ""
            },
            currentSelectIngredient: null,
            currentSelectType: null,
            currentPrepType: null
        };
    }

    public componentDidMount() {
        if (this.props.ingredients.length === 0) {
            this.props.fetchIngredientsStart();
            IngredientService.getIngredients()
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

    public updateName = (e: any) => {
        const { newIngredientItem } = this.state;

        this.setState({
            newIngredientItem: { ...newIngredientItem, name: e ? e.label: null },
            currentSelectIngredient: e,
        });
    }

    public updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { newIngredientItem } = this.state;

        this.setState({ newIngredientItem: { ...newIngredientItem, quantity: e ? e.target.value: null } });
    }

    public updateType = (e: any) => {
        const { newIngredientItem } = this.state;

        this.setState({
            newIngredientItem: { ...newIngredientItem, type: e ? e.value: null },
            currentSelectType: e,
        });
    }
    
    public updatePrepType = (e: any) => {
        const { newIngredientItem } = this.state;

        this.setState({
            newIngredientItem: { ...newIngredientItem, prepType: e ? e.value: null },
            currentPrepType: e,
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
            IngredientService.addIngredient(newIngredientItem.name)
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
        RecipeService.addIngredientItem(recipe.id, newIngredientItem)
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
                    currentPrepType: null
                });
                toast.success("Added!");
            })
            .catch(() => {
                this.props.updateIngredientItemsStop();
                toast.error("Error adding the ingredient item!");
            });
    }

    preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    public render() {
        const { editing, ingredients } = this.props;
        const { newIngredientItem, currentSelectIngredient, currentSelectType, currentPrepType } = this.state;

        const ingredientOptions = ingredients ? ingredients.map((ingredient) => {
            return {
                value: ingredient.name,
                label: ingredient.name,
            };
        }) : [];

        const typeOptions = Object.keys(IngredientType).map((type) => {
            return {
                value: IngredientType[type],
                label: IngredientType[type],
            };
        });
        
        const prepTypeOptions = Object.keys(IngredientPrepType).map((type) => {
            return {
                value: IngredientPrepType[type],
                label: IngredientPrepType[type],
            };
        });

        return (
            <>
                {editing &&
                    <StyledPaper>
                        <form onSubmit={this.preventDefault}>
                            <Typography variant="h6">
                                Add ingredient
                            </Typography>
                            <InputWrapper>
                                <TextField
                                    id="input-quantity"
                                    label="Quantity"
                                    type="text"
                                    value={newIngredientItem.quantity}
                                    onChange={this.updateQuantity}
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
                                    options={typeOptions}
                                    value={currentSelectType}
                                    onChange={this.updateType}
                                    isClearable
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
                                    onChange={this.updateName}
                                    isClearable
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <FormLabel htmlFor="input-ingredient">
                                    Preparation
                                </FormLabel>
                                <Select
                                    id="input-ingredient-preparation"
                                    label="prep-type"
                                    options={prepTypeOptions}
                                    value={currentPrepType}
                                    onChange={this.updatePrepType}
                                    isClearable
                                />
                            </InputWrapper>
                            <ButtonPrimary
                                onClick={this.addIngredient}
                            >
                                Add
                            </ButtonPrimary>
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
