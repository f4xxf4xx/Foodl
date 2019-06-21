import React, { PureComponent } from 'react';
import { Recipe, Cuisine } from '../models';
import { withRouter } from 'react-router-dom';
import IngredientsElement from './IngredientsElement';
import StepsElement from './StepsElement';
import RecipeHeaderElement from './RecipeHeaderElement';
import { recipeService } from '../recipeService';
import { toast } from 'react-toastify';
import { Loader } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import * as recipeActions from '../recipeActions';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";

type State = {
    editing: boolean;
};

type StateProps = {
    recipe: Recipe;
    loadingRecipe: boolean;
    cuisines: Cuisine[];
};

type DispatchProps = {
    fetchRecipeStart: typeof recipeActions.fetchRecipeStart;
    fetchRecipeStop: typeof recipeActions.fetchRecipeStop;
    updateRecipe: typeof recipeActions.updateRecipe;
    fetchCuisinesStart: typeof recipeActions.fetchCuisinesStart;
    fetchCuisinesStop: typeof recipeActions.fetchCuisinesStart;
    updateCuisines: typeof recipeActions.updateCuisines;
    addCuisine: typeof recipeActions.addCuisine;
};

type RouterProps = {
    id: string;
}

interface OwnProps extends RouteComponentProps<RouterProps> { }

type Props = OwnProps & StateProps & RouteComponentProps & DispatchProps;

class RecipeViewBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchRecipeStart();
        recipeService.getRecipe(id)
            .then(recipe => {
                this.props.updateRecipe(recipe);
                this.props.fetchRecipeStop();
            })
            .catch(() => {
                this.props.fetchRecipeStop();
                toast.error("Error fetching the recipe!")
            });

        if (this.props.cuisines.length === 0) {
            this.props.fetchCuisinesStart();
            recipeService.getCuisines()
                .then(cuisines => {
                    this.props.updateCuisines(cuisines);
                    this.props.fetchCuisinesStop();
                })
                .catch(() => {
                    this.props.fetchCuisinesStop();
                    toast.error("Error fetching the cuisines.");
                })
        }

    }

    toggleEdit = () => {
        this.setState((prevState) => {
            return {
                editing: !prevState.editing
            }
        })
    }

    render() {
        const { loadingRecipe } = this.props;
        const { id } = this.props.match.params;
        const { editing } = this.state;

        return (
            <>
                {loadingRecipe ?
                    <Loader active inline='centered' />
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

const mapStateToProps = (state: any) => {
    return {
        recipe: state.recipe.recipe,
        loadingRecipe: state.recipe.loadingRecipe,
        cuisines: state.cuisines.cuisines
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchRecipeStart: bindActionCreators(recipeActions.fetchRecipeStart, dispatch),
        fetchRecipeStop: bindActionCreators(recipeActions.fetchRecipeStop, dispatch),
        updateRecipe: bindActionCreators(recipeActions.updateRecipe, dispatch),
        fetchCuisinesStart: bindActionCreators(recipeActions.fetchCuisinesStart, dispatch),
        fetchCuisinesStop: bindActionCreators(recipeActions.fetchCuisinesStop, dispatch),
        updateCuisines: bindActionCreators(recipeActions.updateCuisines, dispatch),
        addCuisine: bindActionCreators(recipeActions.addCuisine, dispatch),
    };
};

const RecipeView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(withRouter(RecipeViewBase));

export default RecipeView;