import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { recipeService } from '../../../services/recipeService';
import { Button, Typography, FormLabel, TextField, Box } from '@material-ui/core';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as recipesActions from '../../../store/recipes/recipesActions';
import { toast } from 'react-toastify';
import { ButtonPrimary } from '../../Layout/Styles/Buttons';
import { StyledPaper } from '../../Layout/Styles/Sections';
import { ApplicationState } from '../../..';

type State = {
    newRecipeName: string;
};

type StateProps = {
    updatingRecipes: boolean;
};

type DispatchProps = {
    updateRecipesStart: typeof recipesActions.updateRecipesStart;
    updateRecipesStop: typeof recipesActions.updateRecipesStop;
    addRecipe: typeof recipesActions.addRecipe;
};

type Props = StateProps & RouteComponentProps & DispatchProps;

class AddRecipeFormBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newRecipeName: ""
        };
    }

    updateRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newRecipeName: e.target.value });
    }

    handleKeyPress = (event) => {
        if (event.charCode === 13) {
            this.addRecipe();
        }
    }

    addRecipe = () => {
        const { newRecipeName } = this.state;
        if (newRecipeName === "") {
            return;
        }

        this.props.updateRecipesStart();
        recipeService.addRecipe(newRecipeName)
            .then(recipe => {
                this.props.addRecipe(recipe);
                this.props.updateRecipesStop();
                this.setState({
                    newRecipeName: "",
                })
                this.props.history.push(`/recipe/${recipe.id}`);
            })
            .catch(() => {
                this.props.updateRecipesStop();
                toast.error("Error add the recipe!");
            });
    }

    render() {
        const { updatingRecipes } = this.props;
        return (
            <StyledPaper>
                <Typography variant="h6">New recipe</Typography>
                <form onSubmit={e => { e.preventDefault(); }}>
                    <Box>
                        <TextField
                            id="input-recipe-name"
                            label="Recipe name"
                            type="text"
                            onChange={this.updateRecipeName}
                            value={this.state.newRecipeName}
                            disabled={updatingRecipes}
                            onKeyPress={this.handleKeyPress}
                        />
                    </Box>
                    <ButtonPrimary
                        onClick={this.addRecipe}
                        disabled={updatingRecipes}
                    >
                        Create
                    </ButtonPrimary>
                </form>
            </StyledPaper>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    recipes: state.recipes.recipes,
    loadingRecipes: state.recipes.loadingRecipes,
    updatingRecipes: state.recipes.updatingRecipes
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateRecipesStart: bindActionCreators(recipesActions.updateRecipesStart, dispatch),
    updateRecipesStop: bindActionCreators(recipesActions.updateRecipesStop, dispatch),
    addRecipe: bindActionCreators(recipesActions.addRecipe, dispatch),
});

const AddRecipeForm = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(withRouter(AddRecipeFormBase));

export default AddRecipeForm;