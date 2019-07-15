import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { Loader } from "semantic-ui-react";
import { ApplicationState } from "../../..";
import * as recipeActions from "../../../store/recipes/recipeActions";
import { Recipe } from "../models";
import IngredientsElement from "./IngredientsElement";
import RecipeHeaderElement from "./RecipeHeaderElement";
import StepsElement from "./StepsElement";
import { RecipeService } from "../../../services/RecipeService";
import { Grid } from "@material-ui/core";

interface State {
    editing: boolean;
}

interface StateProps {
    recipe: Recipe;
    loadingRecipe: boolean;
    auth: any;
}

interface DispatchProps {
    fetchRecipeStart: typeof recipeActions.fetchRecipeStart;
    fetchRecipeStop: typeof recipeActions.fetchRecipeStop;
    updateRecipe: typeof recipeActions.updateRecipe;
}

interface RouterProps {
    id: string;
}

interface OwnProps extends RouteComponentProps<RouterProps> { }

type Props = OwnProps & StateProps & RouteComponentProps & DispatchProps;

class RecipeViewBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editing: false,
        };
    }

    public componentDidMount() {
        const { id } = this.props.match.params;
        const { auth } = this.props;

        this.props.fetchRecipeStart();
        RecipeService.getRecipeBySlug(auth.uid, id)
            .then((recipe) => {
                this.props.updateRecipe(recipe);
                this.props.fetchRecipeStop();
            })
            .catch((error) => {
                this.props.fetchRecipeStop();
                toast.error("Error fetching the recipe!");
            });

    }

    public toggleEdit = () => {
        this.setState((prevState) => {
            return {
                editing: !prevState.editing,
            };
        });
    }

    public render() {
        const { loadingRecipe, recipe } = this.props;
        const { editing } = this.state;

        return (
            <>
                {loadingRecipe ?
                    <Loader active={true} inline="centered" />
                    :
                    <>
                        {recipe ?
                            <>
                                <RecipeHeaderElement
                                    editing={editing}
                                    toggleEdit={this.toggleEdit}
                                />
                                <Grid container={true} spacing={5}>
                                    <Grid item={true} xs={12} lg={6}>
                                        <IngredientsElement editing={editing} id={recipe.id} />
                                    </Grid>
                                    <Grid item={true} xs={12} lg={6}>
                                        <StepsElement editing={editing} id={recipe.id} />
                                    </Grid>                                    
                                </Grid>
                            </>
                            :
                            null
                        }
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    recipe: state.recipe.recipe,
    loadingRecipe: state.recipe.loadingRecipe,
    auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRecipeStart: bindActionCreators(recipeActions.fetchRecipeStart, dispatch),
    fetchRecipeStop: bindActionCreators(recipeActions.fetchRecipeStop, dispatch),
    updateRecipe: bindActionCreators(recipeActions.updateRecipe, dispatch)
});

const RecipeView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(withRouter(RecipeViewBase));

export default RecipeView;
