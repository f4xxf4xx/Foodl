import { Box, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import * as recipeActions from "../../../store/recipes/recipeActions";
import { Recipe } from "../models";
import { RecipeService } from "../../../services/RecipeService";
import { StyledChip } from "./Styles/StyledChip";
import { Cuisine, RecipeType, Tag } from "../constants";
import { Loader } from "semantic-ui-react";
import ContentEditable from 'react-contenteditable'
import { StyledRecipeInfo } from "./Styles/StyledRecipeInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

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

    public updateContentEditable = (key: string) => (e: React.FocusEvent<HTMLDivElement>) => {
        const { recipe } = this.props;
        const value = e.target.textContent;

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
        const value = e.value;

        this.props.updateRecipeStart();
        RecipeService.updateRecipe(recipe.id, "cuisine", value)
            .then(() => {
                this.props.updateRecipe({ ...recipe, "cuisine": value });
                this.props.updateRecipeStop();
                toast.success("Updated!");
            })
            .catch(() => {
                this.props.updateRecipeStop();
                toast.error("Error updating the recipe!");
            });
    }

    public updateType = (e: any) => {
        const { recipe } = this.props;
        const value = e.value;

        this.props.updateRecipeStart();
        RecipeService.updateRecipe(recipe.id, "type", value)
            .then(() => {
                this.props.updateRecipe({ ...recipe, "type": value });
                this.props.updateRecipeStop();
                toast.success("Updated!");
            })
            .catch(() => {
                this.props.updateRecipeStop();
                toast.error("Error updating the recipe!");
            });
    }

    public addTag = (e: any) => {
        const { recipe } = this.props;
        const value = e.value;

        this.props.updateRecipeStart();
        RecipeService.addTag(recipe.id, value)
            .then((tags) => {
                this.props.updateRecipe({ ...recipe, tags });
                this.props.updateRecipeStop();
                toast.success("Added tag!");
            })
            .catch((error) => {
                console.log(error);
                this.props.updateRecipeStop();
                toast.error("Error adding the tag!");
            });
    }

    public deleteTag = (tag: string) => () => {
        const { recipe } = this.props;

        this.props.updateRecipeStart();
        RecipeService.deleteTag(recipe.id, tag)
            .then((tags) => {
                this.props.updateRecipe({ ...recipe, tags });
                this.props.updateRecipeStop();
                toast.success("Deleted tag!");
            })
            .catch((error) => {
                console.log(error);
                this.props.updateRecipeStop();
                toast.error("Error deleting the tag!");
            })

    }

    public renderRecipeHeader() {
        const { recipe, toggleEdit } = this.props;

        return (
            <>
                <Grid justify="space-between" container={true}>
                    <Grid item={true}>
                        <Typography variant="h3">{recipe.name}</Typography>
                    </Grid>
                    <Grid item={true}>
                        <ButtonPrimary onClick={toggleEdit}>Edit</ButtonPrimary>
                    </Grid>
                </Grid>
                <Box>
                    {recipe.type &&
                        <StyledRecipeInfo>
                            <Typography variant="subtitle2">
                                {recipe.type}
                            </Typography>
                        </StyledRecipeInfo>
                    }
                    {recipe.duration &&
                        <StyledRecipeInfo>
                            <Typography variant="subtitle2">
                                <FontAwesomeIcon size="sm" icon={faClock} />
                                {` ${recipe.duration} minutes`}
                            </Typography>
                        </StyledRecipeInfo>
                    }
                    {recipe.cuisine &&
                        <StyledRecipeInfo>
                            <Typography variant="subtitle2">
                                {recipe.cuisine}
                            </Typography>
                        </StyledRecipeInfo>
                    }
                    <Box>
                        {recipe.tags && recipe.tags.map((tag, index) =>
                            <StyledChip
                                key={index}
                                size="small"
                                label={tag}
                                color="secondary"
                            />
                        )}
                    </Box>
                </Box>
            </>
        )
    }

    public renderEditHeader() {
        const { recipe, updatingRecipe, toggleEdit } = this.props;

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

        const tagOptionsWithoutCurrentTags = recipe ?
            tagOptions.filter(tag => !recipe.tags.includes(tag.value))
            :
            tagOptions;

        return (
            <>
                <Grid justify="space-between" container={true}>
                    <Grid item={true}>
                        <ContentEditable
                            className="MuiTypography-root MuiTypography-h3"
                            html={recipe.name}
                            disabled={updatingRecipe}
                            onBlur={this.updateContentEditable("name")}
                            tagName='h3'
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid item={true}>
                        <ButtonPrimary onClick={toggleEdit}>Stop editing</ButtonPrimary>
                    </Grid>
                </Grid>
                <Box>
                    <StyledRecipeInfo>
                        <Select
                            options={typeOptions}
                            value={recipe.type && {
                                value: recipe.type,
                                label: recipe.type,
                            }}
                            onChange={this.updateType}
                            isDisabled={updatingRecipe}
                        />
                    </StyledRecipeInfo>
                    <StyledRecipeInfo>
                        <TextField
                            placeholder="Duration in minutes"
                            defaultValue={recipe.duration}
                            onBlur={this.updateRecipe("duration")}
                            disabled={updatingRecipe}
                        />
                    </StyledRecipeInfo>
                    {recipe.cuisine &&
                        <StyledRecipeInfo>
                            <Select
                                options={cuisineOptions}
                                value={recipe.cuisine && {
                                    value: recipe.cuisine,
                                    label: recipe.cuisine,
                                }}
                                onChange={this.updateCuisine}
                                isDisabled={updatingRecipe}
                            />
                        </StyledRecipeInfo>
                    }
                    <Box>
                        {recipe.tags && recipe.tags.map((tag, index) =>
                            <StyledChip
                                key={index}
                                size="small"
                                label={tag}
                                color="secondary"
                                onDelete={this.deleteTag(tag)}
                            />
                        )}
                        <Select
                            options={tagOptionsWithoutCurrentTags}
                            value={null}
                            onChange={this.addTag}
                        />
                    </Box>
                </Box>
            </>
        )
    }

    public render() {
        const { recipe, editing } = this.props;

        return (
            recipe ?
                editing ? this.renderEditHeader() : this.renderRecipeHeader()
                :
                <Loader active={true} inline="centered" />
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
    updateRecipe: bindActionCreators(recipeActions.updateRecipe, dispatch)
});

const RecipeHeaderElement = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(RecipeHeaderElementBase);

export default RecipeHeaderElement;
