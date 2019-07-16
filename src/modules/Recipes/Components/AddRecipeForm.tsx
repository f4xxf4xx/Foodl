import { Box, Button, FormLabel, TextField, Typography } from "@material-ui/core";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledPaper } from "../../../layout/Styles/Sections";
import * as recipesActions from "../../../store/recipes/recipesActions";
import { RecipeService } from "../../../services/RecipeService";

interface State {
    newRecipeName: string;
}

interface StateProps {
    updatingRecipes: boolean;
    auth: any;
}

interface DispatchProps {
    updateRecipesStart: typeof recipesActions.updateRecipesStart;
    updateRecipesStop: typeof recipesActions.updateRecipesStop;
    addRecipe: typeof recipesActions.addRecipe;
}

type Props = StateProps & RouteComponentProps & DispatchProps;

class AddRecipeFormBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newRecipeName: "",
        };
    }

    public updateRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newRecipeName: e.target.value });
    }

    public handleKeyPress = (event) => {
        if (event.charCode === 13) {
            this.addRecipe();
        }
    }

    public addRecipe = () => {
        const { newRecipeName } = this.state;
        const { auth } = this.props;

        if (newRecipeName === "") {
            return;
        }

        console.log(auth.uid);
        this.props.updateRecipesStart();
        RecipeService.addRecipe(newRecipeName, auth.uid)
            .then((recipe) => {
                this.props.addRecipe(recipe);
                this.props.updateRecipesStop();
                this.setState({
                    newRecipeName: "",
                });
                this.props.history.push(`/recipe/${recipe.slug}`);
            })
            .catch(() => {
                this.props.updateRecipesStop();
                toast.error("Error add the recipe!");
            });
    }

    preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    public render() {
        const { updatingRecipes } = this.props;

        return (
            <StyledPaper>
                <Typography variant="h6">New recipe</Typography>
                <form onSubmit={this.preventDefault}>
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
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    updatingRecipes: state.recipes.updatingRecipes,
    auth: state.firebase.auth
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateRecipesStart: bindActionCreators(recipesActions.updateRecipesStart, dispatch),
    updateRecipesStop: bindActionCreators(recipesActions.updateRecipesStop, dispatch),
    addRecipe: bindActionCreators(recipesActions.addRecipe, dispatch),
});

const AddRecipeForm = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(withRouter(AddRecipeFormBase));

export default AddRecipeForm;
