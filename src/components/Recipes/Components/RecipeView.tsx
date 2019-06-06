import React, { PureComponent } from 'react';
import { Recipe, IngredientItem } from '../models';
import { withRouter } from 'react-router-dom';
import IngredientsElement from './IngredientsElement';
import StepsElement from './StepsElement';
import RecipeHeaderElement from './RecipeHeaderElement';
import { recipeService } from '../recipeService';
import { ingredientService } from '../../Ingredients/ingredientService';
import { Ingredient } from '../../Ingredients/models';
import { toast } from 'react-toastify';
import { Loader } from 'semantic-ui-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import slugify from 'react-slugify';
import { TableHead, TableBody, TableRow, TableCell, Table, Button, Typography, Paper, FormLabel, TextField } from '@material-ui/core';
import * as recipeActions from '../recipeActions';
import * as ingredientActions from '../../Ingredients/ingredientActions';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import AddRecipeForm from './AddRecipeForm';

type State = {
  editing: boolean;
};

type StateProps = {
  currentRecipe: Recipe;
  currentIngredientItems: IngredientItem[];
  loadingRecipe: boolean;
  updatingRecipe: boolean;
  ingredients: Ingredient[];
  loadingIngredients: boolean;
  loadingIngredientItems: boolean;
  error: string;
};

type DispatchProps = {
  fetchRecipeBegin: typeof recipeActions.fetchRecipeBegin;
  fetchRecipeSuccess: typeof recipeActions.fetchRecipeSuccess;
  fetchRecipeFailure: typeof recipeActions.fetchRecipeFailure;
  updateRecipeBegin: typeof recipeActions.updateRecipeBegin;
  updateRecipeSuccess: typeof recipeActions.updateRecipeSuccess;
  updateRecipeFailure: typeof recipeActions.updateRecipeFailure;
  fetchIngredientsBegin: typeof ingredientActions.fetchIngredientsBegin;
  fetchIngredientsSuccess: typeof ingredientActions.fetchIngredientsSuccess;
  fetchIngredientsFailure: typeof ingredientActions.fetchIngredientsFailure;
  fetchIngredientItemsBegin: typeof recipeActions.fetchIngredientItemsBegin;
  fetchIngredientItemsSuccess: typeof recipeActions.fetchIngredientItemsSuccess;
  fetchIngredientItemsFailure: typeof recipeActions.fetchIngredientItemsFailure;
  addIngredientItemBegin: typeof recipeActions.addIngredientItemBegin;
  addIngredientItemSuccess: typeof recipeActions.addIngredientItemSuccess;
  addIngredientItemFailure: typeof recipeActions.addIngredientItemFailure;
  deleteIngredientItemBegin: typeof recipeActions.deleteIngredientItemBegin;
  deleteIngredientItemSuccess: typeof recipeActions.deleteIngredientItemSuccess;
  deleteIngredientItemFailure: typeof recipeActions.deleteIngredientItemFailure;
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

    if (this.props.currentRecipe === null) {
      this.props.fetchRecipeBegin();
      recipeService.getRecipe(id)
        .then(recipe => this.props.fetchRecipeSuccess(recipe))
        .catch(() => this.props.fetchRecipeFailure());
    }

    if (this.props.currentIngredientItems.length === 0) {
      this.props.fetchIngredientItemsBegin()
      recipeService.getIngredientItems(id)
        .then(ingredientItems => this.props.fetchIngredientItemsSuccess(ingredientItems))
        .catch(() => this.props.fetchIngredientItemsFailure())
    }

    if (this.props.ingredients) {
      ingredientService.getIngredients()
        .then(ingredients => this.props.fetchIngredientsSuccess(ingredients))
        .catch(() => this.props.fetchIngredientsFailure())
      }
  }

  addIngredient = (newIngredientItem: IngredientItem) => {
    const { ingredients, currentRecipe, currentIngredientItems } = this.props;
    
    if (!ingredients.find(i => i.name === newIngredientItem.name)) {
      // TODO TODO TODO DISPATCH UPDATE
      ingredientService.addIngredient(newIngredientItem.name);
    }

    this.props.addIngredientItemBegin();
    recipeService.addIngredientItem(currentRecipe.id, newIngredientItem)
      .then((ingredientItem) => {
        this.props.addIngredientItemSuccess(ingredientItem)
        toast.success("Added!");
      })
      .catch(() => this.props.addIngredientItemFailure())
  }

  deleteIngredient = (ingredientItemId: string) => {
    const { currentRecipe, currentIngredientItems } = this.props;

    this.props.deleteIngredientItemBegin();
    recipeService.deleteIngredientItem(currentRecipe.id, ingredientItemId)
      .then(() => {
        this.props.deleteIngredientItemSuccess(currentRecipe.id);
        toast.success("Deleted!");
      })
      .catch(() => this.props.deleteIngredientItemFailure())
  }

  toggleEdit = () => {
    this.setState((prevState) => {
      return {
        editing: !prevState.editing
      }
    })
  }

  updateRecipe = (key: string, value: string) => {
    const { currentRecipe } = this.props;

    recipeService.updateRecipe(currentRecipe.id, key, value)
      .then(() => {
        this.props.updateRecipeSuccess();
        toast.success("Updated!");
      })
      .catch(() => this.props.updateRecipeFailure())
  }

  render() {
    const { currentRecipe, ingredients, currentIngredientItems, updatingRecipe, loadingRecipe, loadingIngredients } = this.props;
    const { editing } = this.state;

    return (
      <>
        <RecipeHeaderElement
          recipe={currentRecipe}
          ingredientItems={currentIngredientItems}
          editing={updatingRecipe}
          updateRecipe={this.updateRecipe}
          toggleEdit={this.toggleEdit}
        />
        {(loadingRecipe || loadingIngredients) ?
          <Loader active inline='centered' />
          :
          <>
            <IngredientsElement
              editing={editing}
              ingredients={ingredients}
              ingredientItems={currentIngredientItems}
              addIngredient={this.addIngredient}
              deleteIngredient={this.deleteIngredient}
            />
            <StepsElement
              recipe={currentRecipe}
            />
          </>
        }
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
      currentRecipe: state.recipes.currentRecipe,
      currentIngredientItems: state.recipes.currentIngredientItems,
      loadingRecipe: state.recipes.loadingRecipe,
      updatingRecipe: state.recipes.updatingRecipe,
      ingredients: state.recipes.ingredients,
      loadingIngredients: state.recipes.loadingIngredients,
      loadingIngredientItems: state.recipes.loadingIngredientItems,
      error: state.recipes.error
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
      fetchRecipeBegin: bindActionCreators(recipeActions.fetchRecipeBegin, dispatch),
      fetchRecipeSuccess: bindActionCreators(recipeActions.fetchRecipeSuccess, dispatch),
      fetchRecipeFailure: bindActionCreators(recipeActions.fetchRecipeFailure, dispatch),
      updateRecipeBegin: bindActionCreators(recipeActions.updateRecipeBegin, dispatch),
      updateRecipeSuccess: bindActionCreators(recipeActions.updateRecipeSuccess, dispatch),
      updateRecipeFailure: bindActionCreators(recipeActions.updateRecipeFailure, dispatch),
      deleteRecipeFailure: bindActionCreators(recipeActions.deleteRecipeFailure, dispatch),
      fetchIngredientsBegin: bindActionCreators(ingredientActions.fetchIngredientsBegin, dispatch),
      fetchIngredientsSuccess: bindActionCreators(ingredientActions.fetchIngredientsSuccess, dispatch),
      fetchIngredientsFailure: bindActionCreators(ingredientActions.fetchIngredientsFailure, dispatch),
      fetchIngredientItemsBegin: bindActionCreators(recipeActions.fetchIngredientItemsBegin, dispatch),
      fetchIngredientItemsSuccess: bindActionCreators(recipeActions.fetchIngredientItemsSuccess, dispatch),
      fetchIngredientItemsFailure: bindActionCreators(recipeActions.fetchIngredientItemsFailure, dispatch),
      addIngredientItemBegin: bindActionCreators(recipeActions.addIngredientItemBegin, dispatch),
      addIngredientItemSuccess: bindActionCreators(recipeActions.addIngredientItemSuccess, dispatch),
      addIngredientItemFailure: bindActionCreators(recipeActions.addIngredientItemFailure, dispatch),
      deleteIngredientItemBegin: bindActionCreators(recipeActions.deleteIngredientItemBegin, dispatch),
      deleteIngredientItemSuccess: bindActionCreators(recipeActions.deleteIngredientItemSuccess, dispatch),
      deleteIngredientItemFailure: bindActionCreators(recipeActions.deleteIngredientItemFailure, dispatch),
  };
};

const RecipeView = compose(
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(withRouter(RecipeViewBase));

export default RecipeView;