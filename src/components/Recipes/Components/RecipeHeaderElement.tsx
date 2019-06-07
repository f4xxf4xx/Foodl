import React from "react";
import { Recipe, IngredientItem } from "../models";
import Statistic from "../../Layout/Statistic";
import { Typography, Button, TextField } from "@material-ui/core";
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
                    <Statistic
                        name={"Type"}
                        value={recipe.recipeType}
                        icon={"fa-th-large"}
                    />
                }
                {recipe.duration &&
                    <Statistic
                        name={"Duration"}
                        value={recipe.duration.toString()}
                        icon={"fa-clock"}
                    />
                }
                {loadingIngredientItems ?
                    <Loader active inline='centered' />
                    :
                    <Statistic
                        name={"Ingredient number"}
                        value={ingredientItems.length.toString()}
                        icon={"fa-apple-alt"}
                    />
                }
            </>
        )
    }

    render() {
        const { recipe, editing, toggleEdit } = this.props;

        return (
            recipe ?
                <>
                    <div>
                        {editing ?
                            <TextField defaultValue={recipe.name} onBlur={this.updateRecipe("name")} />
                            :
                            <Typography variant="h3">{recipe.name}</Typography>
                        }
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={toggleEdit}>
                            {editing ? "Stop editing" : "Edit"}
                        </Button>
                    </div>
                    <div>
                        {editing ?
                            <TextField
                                defaultValue={recipe.description}
                                multiline
                                onBlur={this.updateRecipe("description")}
                            />
                            :
                            <Typography>
                                {recipe.description}
                            </Typography>
                        }
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
        loadingIngredientItems: state.recipe.loadingIngredientItems
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