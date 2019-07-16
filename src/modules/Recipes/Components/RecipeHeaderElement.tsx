import { Box, Chip, Grid, Icon, TextField, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { Title } from "../../../layout/Styles/Sections";
import * as recipeActions from "../../../store/recipes/recipeActions";
import { Recipe, Cuisine, RecipeType, Tag } from "../models";
import { RecipeService } from "../../../services/RecipeService";
import { StyledChip } from "./Styles/StyledChip";

interface StateProps {
    recipe: Recipe;
    updatingRecipe: boolean;
}

interface OwnProps {
    editing: boolean;
    toggleEdit: () => void;
}

interface DispatchProps {
    updateRecipeStart: typeof recipeActions.updateRecipeStart;
    updateRecipeStop: typeof recipeActions.updateRecipeStop;
    updateRecipe: typeof recipeActions.updateRecipe;
    addTag: typeof recipeActions.addTag;
    deleteTag: typeof recipeActions.deleteTag;
}

type Props = OwnProps & StateProps & DispatchProps;

class RecipeHeaderElementBase extends React.Component<Props> {
    public updateRecipe = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { recipe } = this.props;
        const value = e.currentTarget.value;

        this.props.updateRecipeStart();
        RecipeService.updateRecipe(recipe.id, key, value)
            .then(() => {
                this.props.updateRecipe({ ...recipe, [key]: value });
                this.props.updateRecipeStop();
                toast.success("Updated!");
            })
            .catch(() => {
                this.props.updateRecipeStop();
                toast.error("Error updating the recipe!");
            });
    }

    public updateCuisine = (e: any) => {
        const { recipe } = this.props;
        const value = e.label;

        this.props.updateRecipeStart();
        RecipeService.updateRecipe(recipe.id, "cuisine", value)
            .then(() => {
                this.props.updateRecipe({ ...recipe, ["cuisine"]: value });
                this.props.updateRecipeStop();
                toast.success("Updated!");
            })
            .catch(() => {
                this.props.updateRecipeStop();
                toast.error("Error updating the recipe!");
            });
    }

    public updateTag = (e: any) => {
        const { recipe } = this.props;
        const value = e.label;

        this.props.updateRecipeStart();
        RecipeService.addTag(recipe.id, value)
            .then(() => {
                this.props.addTag(value);
                this.props.updateRecipeStop();
                toast.success("Added tag!");
            })
            .catch((error) => {
                console.log(error);
                this.props.updateRecipeStop();
                toast.error("Error adding the tag!");
            });
    }

    public updateType = (e: any) => {
        const { recipe } = this.props;
        const value = e.label;

        this.props.updateRecipeStart();
        RecipeService.updateRecipe(recipe.id, "type", value)
            .then(() => {
                this.props.updateRecipe({ ...recipe, ["type"]: value });
                this.props.updateRecipeStop();
                toast.success("Updated!");
            })
            .catch(() => {
                this.props.updateRecipeStop();
                toast.error("Error updating the recipe!");
            });
    }

    public addTag = (tag: string) => (e: any) => {
        const { recipe } = this.props;

        this.props.updateRecipeStart();
        RecipeService.addTag(recipe.id, tag)
            .then(() => {
                this.props.addTag(tag);
                this.props.updateRecipeStop();
                toast.success("Added tag!");
            })
            .catch(() => {
                this.props.updateRecipeStop();
                toast.error("Error adding the tag!");
            })
    }

    public deleteTag = (tag: string) => (e: any) => {
        const { recipe } = this.props;

        this.props.updateRecipeStart();
        RecipeService.deleteTag(recipe.id, tag)
            .then(() => {
                this.props.deleteTag(tag);
                this.props.updateRecipeStop();
                toast.success("Deleted tag!");
            })
            .catch((error) => {
                console.log(error);
                this.props.updateRecipeStop();
                toast.error("Error deleting the tag!");
            })

    }

    public renderInfo() {
        const { recipe, editing, updatingRecipe } = this.props;

        const cuisineOptions = Object.keys(Cuisine).map((cuisine) => {
            return {
                value: Cuisine[cuisine],
                label: Cuisine[cuisine],
            };
        });

        const typeOptions = Object.keys(RecipeType).map((type) => {
            return {
                value: RecipeType[type],
                label: RecipeType[type],
            };
        });

        const tagOptions = Object.keys(Tag).map((tag) => {
            return {
                value: Tag[tag],
                label: Tag[tag]
            }
        })

        return (
            recipe &&
            <>
                {editing ?
                    <Select
                        options={typeOptions}
                        value={recipe.type && {
                            value: recipe.type,
                            label: recipe.type,
                        }}
                        onChange={this.updateType}
                    />
                    :
                    recipe.type &&
                    <StyledChip
                        size="small"
                        label={recipe.type}
                        color="primary"
                        variant="outlined"
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
                    <StyledChip
                        size="small"
                        icon={<Icon>timer</Icon>}
                        label={`${recipe.duration} minutes`}
                        color="primary"
                        variant="outlined"
                    />
                }
                {editing ?
                    <Select
                        options={cuisineOptions}
                        value={recipe.cuisine && {
                            value: recipe.cuisine,
                            label: recipe.cuisine,
                        }}
                        onChange={this.updateCuisine}
                    />
                    :
                    recipe.cuisine &&
                    <StyledChip
                        size="small"
                        label={recipe.cuisine}
                        color="primary"
                        variant="outlined"
                    />
                }
                <Box>
                    {editing ?
                        <>
                            {recipe.tags && recipe.tags.map((tag, index) =>
                                <StyledChip
                                    key={index}
                                    size="small"
                                    label={tag}
                                    color="secondary"
                                    onDelete={this.deleteTag(tag)}
                                />
                            )
                            }
                            <Select
                                options={tagOptions}
                                value={null}
                                onChange={this.updateTag}
                            />
                        </>
                        :
                        recipe.tags && recipe.tags.map((tag, index) =>
                            <StyledChip
                                key={index}
                                size="small"
                                label={tag}
                                color="secondary"
                            />
                        )
                    }
                </Box>
            </>
        );
    }

    public render() {
        const { recipe, editing, toggleEdit, updatingRecipe } = this.props;

        return (
            recipe ?
                <>
                    <Grid justify="space-between" container={true}>
                        <Grid item={true}>
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
                        <Grid item={true}>
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

const mapStateToProps = (state: ApplicationState) => ({
    recipe: state.recipe.recipe,
    updatingRecipe: state.recipe.updatingRecipe,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateRecipeStart: bindActionCreators(recipeActions.updateRecipeStart, dispatch),
    updateRecipeStop: bindActionCreators(recipeActions.updateRecipeStop, dispatch),
    updateRecipe: bindActionCreators(recipeActions.updateRecipe, dispatch),
    addTag: bindActionCreators(recipeActions.addTag, dispatch),
    deleteTag: bindActionCreators(recipeActions.deleteTag, dispatch),
});

const RecipeHeaderElement = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(RecipeHeaderElementBase);

export default RecipeHeaderElement;
