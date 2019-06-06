import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { recipeService } from '../recipeService';
import { Button, Typography, FormLabel, TextField } from '@material-ui/core';
import * as recipeActions from '../recipeActions';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";

type State = {
    newRecipeName: string;
};

type StateProps = {
    updatingRecipes: boolean;
};

type DispatchProps = {
    addRecipeBegin: typeof recipeActions.addRecipeBegin;
    addRecipeSuccess: typeof recipeActions.addRecipeSuccess;
    addRecipeFailure: typeof recipeActions.addRecipeFailure;
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

        this.props.addRecipeBegin();
        recipeService.addRecipe(newRecipeName)
            .then(recipe => {
                this.props.addRecipeSuccess(recipe);
                this.setState({
                    newRecipeName: "",
                })
                this.props.history.push(`/recipe/${recipe.id}`);
            })
            .catch(() => this.props.addRecipeFailure());
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
        addRecipeBegin: bindActionCreators(recipeActions.addRecipeBegin, dispatch),
        addRecipeSuccess: bindActionCreators(recipeActions.addRecipeSuccess, dispatch),
        addRecipeFailure: bindActionCreators(recipeActions.addRecipeFailure, dispatch),
    };
};

const AddRecipeForm = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(withRouter(AddRecipeFormBase));

export default AddRecipeForm;