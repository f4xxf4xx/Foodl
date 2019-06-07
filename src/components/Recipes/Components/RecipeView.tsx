import React, { PureComponent } from 'react';
import { Recipe } from '../models';
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
};

type DispatchProps = {
  fetchRecipeStart: typeof recipeActions.fetchRecipeStart;
  fetchRecipeStop: typeof recipeActions.fetchRecipeStop;
  updateRecipe: typeof recipeActions.updateRecipe;
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

    if (this.props.recipe === null) {
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
        <RecipeHeaderElement
          editing={editing}
          toggleEdit={this.toggleEdit}
        />
        {loadingRecipe ?
          <Loader active inline='centered' />
          :
          <>
            <IngredientsElement editing={editing} id={id} />
            <StepsElement />
          </>
        }
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    recipe: state.recipe.recipe,
    loadingRecipe: state.recipe.loadingRecipe
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchRecipeStart: bindActionCreators(recipeActions.fetchRecipeStart, dispatch),
    fetchRecipeStop: bindActionCreators(recipeActions.fetchRecipeStop, dispatch),
    updateRecipe: bindActionCreators(recipeActions.updateRecipe, dispatch)
  };
};

const RecipeView = compose(
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(withRouter(RecipeViewBase));

export default RecipeView;