import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { Loader } from "semantic-ui-react";
import { ApplicationState } from "../../..";
import { recipeService } from "../../../services/recipeService";
import * as recipeActions from "../../../store/recipes/recipeActions";
import { Cuisine, Recipe } from "../models";
import IngredientsElement from "./IngredientsElement";
import RecipeHeaderElement from "./RecipeHeaderElement";
import StepsElement from "./StepsElement";

interface State {
    editing: boolean;
}

interface StateProps {
    recipe: Recipe;
    loadingRecipe: boolean;
    cuisines: Cuisine[];
}

interface DispatchProps {
    fetchRecipeStart: typeof recipeActions.fetchRecipeStart;
    fetchRecipeStop: typeof recipeActions.fetchRecipeStop;
    updateRecipe: typeof recipeActions.updateRecipe;
    fetchCuisinesStart: typeof recipeActions.fetchCuisinesStart;
    fetchCuisinesStop: typeof recipeActions.fetchCuisinesStart;
    updateCuisines: typeof recipeActions.updateCuisines;
    addCuisine: typeof recipeActions.addCuisine;
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

        this.props.fetchRecipeStart();
        recipeService.getRecipe(id)
            .then((recipe) => {
                this.props.updateRecipe(recipe);
                this.props.fetchRecipeStop();
            })
            .catch(() => {
                this.props.fetchRecipeStop();
                toast.error("Error fetching the recipe!");
            });

        if (this.props.cuisines.length === 0) {
            this.props.fetchCuisinesStart();
            recipeService.getCuisines()
                .then((cuisines) => {
                    this.props.updateCuisines(cuisines);
                    this.props.fetchCuisinesStop();
                })
                .catch(() => {
                    this.props.fetchCuisinesStop();
                    toast.error("Error fetching the cuisines.");
                });
        }

    }

    public toggleEdit = () => {
        this.setState((prevState) => {
            return {
                editing: !prevState.editing,
            };
        });
    }

    public render() {
        const { loadingRecipe } = this.props;
        const { id } = this.props.match.params;
        const { editing } = this.state;

        return (
            <>
                {loadingRecipe ?
                    <Loader active={true} inline="centered" />
                    :
                    <>
                        <RecipeHeaderElement
                            editing={editing}
                            toggleEdit={this.toggleEdit}
                        />
                        <IngredientsElement editing={editing} id={id} />
                        <StepsElement editing={editing} id={id} />
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    recipe: state.recipe.recipe,
    loadingRecipe: state.recipe.loadingRecipe,
    cuisines: state.cuisines.cuisines,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRecipeStart: bindActionCreators(recipeActions.fetchRecipeStart, dispatch),
    fetchRecipeStop: bindActionCreators(recipeActions.fetchRecipeStop, dispatch),
    updateRecipe: bindActionCreators(recipeActions.updateRecipe, dispatch),
    fetchCuisinesStart: bindActionCreators(recipeActions.fetchCuisinesStart, dispatch),
    fetchCuisinesStop: bindActionCreators(recipeActions.fetchCuisinesStop, dispatch),
    updateCuisines: bindActionCreators(recipeActions.updateCuisines, dispatch),
    addCuisine: bindActionCreators(recipeActions.addCuisine, dispatch),
});

const RecipeView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(withRouter(RecipeViewBase));

export default RecipeView;
