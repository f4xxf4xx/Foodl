import React from "react";
import { Recipe, IngredientItem, Cuisine } from "../models";
import { Typography, Button, TextField, Icon, Chip, Box, Grid } from "@material-ui/core";
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Loader } from 'semantic-ui-react';
import * as recipeActions from '../recipeActions';
import { recipeService } from "../recipeService";
import { toast } from "react-toastify";
import Creatable from 'react-select/lib/Creatable';
import { Title } from "../../Layout/Styles/Sections";
import { ButtonPrimary } from "../../Layout/Styles/Buttons";

type StateProps = {
    recipe: Recipe;
    updatingRecipe: boolean;
    cuisines: Cuisine[];
};

type OwnProps = {
    editing: boolean;
    toggleEdit: () => void;
};

type DispatchProps = {
    updateRecipeStart: typeof recipeActions.updateRecipeStart;
    updateRecipeStop: typeof recipeActions.updateRecipeStop;
    updateRecipe: typeof recipeActions.updateRecipe;
    addCuisine: typeof recipeActions.addCuisine;
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

    updateCuisine = (e: any) => {
        const { recipe, cuisines } = this.props;
        const value = e.label;

        if (!cuisines.find(i => i.name === value)) {
            recipeService.addCuisine(value)
                .then((cuisine) => {
                    this.props.addCuisine(cuisine);
                })
                .catch(() => {
                    toast.error("Error adding the new cuisine.")
                })
        }

        this.props.updateRecipeStart();
        recipeService.updateRecipe(recipe.id, "cuisine", value)
            .then(() => {
                this.props.updateRecipe({ ...recipe, ["cuisine"]: value });
                this.props.updateRecipeStop();
                toast.success("Updated!");
            })
            .catch(() => {
                this.props.updateRecipeStop();
                toast.error("Error updating the recipe!");
            })
    }

    renderInfo() {
        const { recipe, cuisines, editing, updatingRecipe } = this.props;

        const cuisineOptions = cuisines ? cuisines.map(cuisine => {
            return {
                value: cuisine.id,
                label: cuisine.name
            }
        }) : [];

        const matchingCuisine = cuisines ? cuisines.find(cuisine => cuisine.name === recipe.cuisine) : null
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
                {editing ?
                    <TextField
                        placeholder="Duration in minutes"
                        defaultValue={recipe.duration}
                        onBlur={this.updateRecipe("duration")}
                        disabled={updatingRecipe}
                    />
                    :
                    recipe.duration &&
                    <Chip
                        size="small"
                        icon={<Icon>timer</Icon>}
                        label={`${recipe.duration} minutes`}
                        color="primary"
                    />
                }
                {editing ?
                    <Creatable
                        id="input-ingredient"
                        options={cuisineOptions}
                        value={matchingCuisine && {
                            value: matchingCuisine.id,
                            label: matchingCuisine.name
                        }}
                        onChange={this.updateCuisine}
                    />
                    :
                    recipe.cuisine &&
                    <Chip
                        size="small"
                        label={recipe.cuisine}
                        color="secondary"
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
                    <Grid justify="space-between" container>
                        <Grid item>
                            {editing ?
                                <TextField
                                    defaultValue={recipe.name}
                                    onBlur={this.updateRecipe("name")}
                                    disabled={updatingRecipe}
                                />
                                :
                                <Title>{recipe.name}</Title>
                            }
                        </Grid>
                        <Grid item>
                            <ButtonPrimary onClick={toggleEdit}>
                                {editing ? "Stop editing" : "Edit"}
                            </ButtonPrimary>
                        </Grid>
                    </Grid>
                    <Box>
                        {this.renderInfo()}
                    </Box>
                </>
                : null
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        recipe: state.recipe.recipe,
        updatingRecipe: state.recipe.updatingRecipe,
        cuisines: state.cuisines.cuisines
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateRecipeStart: bindActionCreators(recipeActions.updateRecipeStart, dispatch),
        updateRecipeStop: bindActionCreators(recipeActions.updateRecipeStop, dispatch),
        updateRecipe: bindActionCreators(recipeActions.updateRecipe, dispatch),
        addCuisine: bindActionCreators(recipeActions.addCuisine, dispatch)
    };
};

const RecipeHeaderElement = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(RecipeHeaderElementBase);

export default RecipeHeaderElement;