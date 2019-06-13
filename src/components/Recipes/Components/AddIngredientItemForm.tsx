import React, { PureComponent } from 'react';
import { Recipe, IngredientItem } from '../models';
import { getIngredientText, getIngredientTypeOptions } from '../helper';
import { Ingredient } from '../../Ingredients/models';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';
import { Table, TableBody, Divider, TableRow, TableCell, Button, Typography, Avatar, FormLabel, TextField, Paper } from '@material-ui/core';
import * as recipeActions from '../recipeActions';
import * as ingredientActions from '../../Ingredients/ingredientActions';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Loader } from 'semantic-ui-react';
import { recipeService } from '../recipeService';
import { toast } from 'react-toastify';
import { ingredientService } from '../../Ingredients/ingredientService';

type OwnProps = {
    editing: boolean;
}

type StateProps = {
    recipe: Recipe;
    ingredients: Ingredient[];
    loadingIngredients: boolean;
}

type State = {
    newIngredientItem: IngredientItem;
    currentSelectIngredient: any;
    currentSelectType: any;
}

type DispatchProps = {
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
                type: ""
            },
            currentSelectIngredient: null,
            currentSelectType: null
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

    updateFormName = (e: any) => {
        const { newIngredientItem } = this.state;
        this.setState({
            newIngredientItem: { ...newIngredientItem, name: e.label },
            currentSelectIngredient: e
        });
    }

    updateFormQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { newIngredientItem } = this.state;
        this.setState({ newIngredientItem: { ...newIngredientItem, quantity: e.target.value } });
    }

    updateFormType = (e: any) => {
        const { newIngredientItem } = this.state;
        this.setState({
            newIngredientItem: { ...newIngredientItem, type: e.value },
            currentSelectType: e
        });
    }

    addIngredient = () => {
        const { newIngredientItem } = this.state;
        const { ingredients, recipe } = this.props;

        if (!ingredients.find(i => i.name === newIngredientItem.name)) {
            ingredientService.addIngredient(newIngredientItem.name)
                .then((ingredient) => {
                    this.props.addIngredient(ingredient);
                })
                .catch(() => {
                    toast.error("Error adding the ingredient.")
                })
        }

        this.props.updateIngredientItemsStart();
        recipeService.addIngredientItem(recipe.id, newIngredientItem)
            .then((ingredientItem) => {
                this.props.addIngredientItem(ingredientItem);
                this.props.updateIngredientItemsStop();
                this.setState({
                    newIngredientItem: {
                        ...newIngredientItem, name: "",
                        quantity: "", type: ""
                    },
                    currentSelectIngredient: null,
                    currentSelectType: null
                });
                toast.success("Added!");
            })
            .catch(() => {
                this.props.updateIngredientItemsStop();
                toast.error("Error adding the ingredient item!");
            });
    }

    render() {
        const { editing, ingredients } = this.props;
        const { newIngredientItem, currentSelectIngredient, currentSelectType } = this.state;

        const ingredientOptions = ingredients ? ingredients.map(ingredient => {
            return {
                value: ingredient.id,
                label: ingredient.name
            }
        }) : [];

        return (
            <Paper>
                {editing &&
                    <form onSubmit={e => { e.preventDefault(); }}>
                        <Typography variant="h6">
                            Add ingredient
                        </Typography>
                        <div>
                            <FormLabel htmlFor="input-ingredient">
                                Ingredient
                            </FormLabel>
                            <Creatable
                                id="input-ingredient"
                                options={ingredientOptions}
                                value={currentSelectIngredient}
                                onChange={this.updateFormName}
                            />
                            <FormLabel htmlFor="input-quantity">
                                Quantity
                            </FormLabel>
                            <TextField
                                id="input-quantity"
                                placeholder="Quantity"
                                type="text"
                                value={newIngredientItem.quantity}
                                onChange={this.updateFormQuantity}
                            />
                            <FormLabel htmlFor="input-type">
                                Type
                            </FormLabel>
                            <Select
                                id="input-type"
                                options={getIngredientTypeOptions()}
                                value={currentSelectType}
                                onChange={this.updateFormType}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.addIngredient}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                }
            </Paper>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        recipe: state.recipe.recipe,
        ingredients: state.ingredients.ingredients,
        loadingIngredients: state.ingredients.loadingIngredients
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateIngredientItemsStart: bindActionCreators(recipeActions.updateIngredientItemsStart, dispatch),
        updateIngredientItemsStop: bindActionCreators(recipeActions.updateIngredientItemsStop, dispatch),
        updateIngredientItems: bindActionCreators(recipeActions.updateIngredientItems, dispatch),
        addIngredientItem: bindActionCreators(recipeActions.addIngredientItem, dispatch),
        updateIngredients: bindActionCreators(ingredientActions.updateIngredients, dispatch),
        fetchIngredientsStart: bindActionCreators(ingredientActions.fetchIngredientsStart, dispatch),
        fetchIngredientsStop: bindActionCreators(ingredientActions.fetchIngredientsStop, dispatch),
        addIngredient: bindActionCreators(ingredientActions.addIngredient, dispatch),
    };
};

const AddIngredientItemForm = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(AddIngredientItemFormBase);

export default AddIngredientItemForm;