import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { recipeService } from '../recipeService';
import { Button, Typography, FormLabel, TextField } from '@material-ui/core';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as recipesActions from '../recipesActions';
import { toast } from 'react-toastify';

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
            <>
                <Typography variant="h5">New recipe</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.addRecipe}
                    disabled={updatingRecipes}
                >
                    Create
                </Button>
                <form onSubmit={e => { e.preventDefault(); }}>
                    <div>
                        <FormLabel htmlFor="input-recipe-name">
                            Recipe name
                        </FormLabel>
                        <TextField
                            id="input-recipe-name"
                            placeholder="Recipe name"
                            type="text"
                            onChange={this.updateRecipeName}
                            value={this.state.newRecipeName}
                            disabled={updatingRecipes}
                            onKeyPress={this.handleKeyPress}
                        />
                    </div>
                </form>
            </>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        recipes: state.recipes.recipes,
        loadingRecipes: state.recipes.loadingRecipes,
        updatingRecipes: state.recipes.updatingRecipes,
        error: state.recipes.error
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateRecipesStart: bindActionCreators(recipesActions.updateRecipesStart, dispatch),
        updateRecipesStop: bindActionCreators(recipesActions.updateRecipesStop, dispatch),
        addRecipe: bindActionCreators(recipesActions.addRecipe, dispatch),
    };
};

const AddRecipeForm = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(withRouter(AddRecipeFormBase));

export default AddRecipeForm;