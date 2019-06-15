import React from "react";
import { Recipe, IngredientItem } from "../models";
import { Typography, Button, TextField, Icon, Chip } from "@material-ui/core";
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Loader } from 'semantic-ui-react';
import * as recipeActions from '../recipeActions';
import { recipeService } from "../recipeService";
import { toast } from "react-toastify";

type StateProps = {
    recipe: Recipe;
    ingredientItems: IngredientItem[];
    loadingIngredientItems: boolean;
    updatingRecipe: boolean;
};

type OwnProps = {
    editing: boolean;
    toggleEdit: () => void;
};

type DispatchProps = {
    updateRecipeStart: typeof recipeActions.updateRecipeStart;
    updateRecipeStop: typeof recipeActions.updateRecipeStop;
    updateRecipe: typeof recipeActions.updateRecipe;
}

type Props = OwnProps & StateProps & DispatchProps;

class RecipeHeaderElementBase extends React.Component<Props> {
    updateRecipe = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { recipe } = this.props;
        const value = e.currentTarget.value;

        this.props.updateRecipeStart();
        recipeService.updateRecipe(recipe.id, key, value)
            .then(() => {
                this.props.updateRecipe({ ...recipe, [key]: value });
                this.props.updateRecipeStop();
                toast.success("Updated!");
            })
            .catch(() => {
                this.props.updateRecipeStop();
                toast.error("Error updating the recipe!");
            })
    }

    renderStatistics() {
        const { recipe, ingredientItems, loadingIngredientItems } = this.props;

        return (
            recipe &&
            <>
                {recipe.recipeType &&
                    <Chip
                        size="small"
                        icon={<Icon>local_pizza</Icon>}
                        label={recipe.recipeType}
                        color="primary"
                    />
                }
                {recipe.duration &&
                    <Chip
                        size="small"
                        icon={<Icon>timer</Icon>}
                        label={`${recipe.duration} minutes`}
                        color="primary"
                    />
                }
                {loadingIngredientItems ?
                    <Loader active inline='centered' />
                    :
                    <Chip
                        size="small"
                        icon={<Icon>local_pizza</Icon>}
                        label={`${ingredientItems.length.toString()} ingredients`}
                        color="primary"
                    />
                }
            </>
        )
    }

    render() {
        const { recipe, editing, toggleEdit, updatingRecipe } = this.props;

        return (
            recipe ?
                <>
                    <div>
                        <Button variant="contained" color="primary" onClick={toggleEdit}>
                            {editing ? "Stop editing" : "Edit"}
                        </Button>
                    </div>
                    <div>
                        {editing ?
                            <TextField
                                defaultValue={recipe.name}
                                onBlur={this.updateRecipe("name")}
                                disabled={updatingRecipe}
                            />
                            :
                            <Typography variant="h3">{recipe.name}</Typography>
                        }
                    </div>
                    <div>
                        {/* {editing ?
                            <TextField
                                defaultValue={recipe.description}
                                multiline
                                onBlur={this.updateRecipe("description")}
                            />
                            :
                            <Typography>
                                {recipe.description}
                            </Typography>
                        } */}
                    </div>
                    <div>
                        {this.renderStatistics()}
                    </div>
                </>
                : null
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        recipe: state.recipe.recipe,
        ingredientItems: state.recipe.ingredientItems,
        loadingIngredientItems: state.recipe.loadingIngredientItems,
        updatingRecipe: state.recipe.updatingRecipe
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateRecipeStart: bindActionCreators(recipeActions.updateRecipeStart, dispatch),
        updateRecipeStop: bindActionCreators(recipeActions.updateRecipeStop, dispatch),
        updateRecipe: bindActionCreators(recipeActions.updateRecipe, dispatch)
    };
};

const RecipeHeaderElement = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(RecipeHeaderElementBase);

export default RecipeHeaderElement;