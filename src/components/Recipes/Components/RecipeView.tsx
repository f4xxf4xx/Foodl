import React, { PureComponent } from 'react';
import { Recipe, IngredientItem } from '../models';
import { withRouter } from 'react-router-dom';
import Header from '../../Layout/Header';
import IngredientsElement from './IngredientsElement';
import StepsElement from './StepsElement';
import RecipeHeaderElement from './RecipeHeaderElement';
import { recipeService } from '../recipeService';
import { ingredientService } from '../../Ingredients/ingredientService';
import { Ingredient } from '../../Ingredients/models';
import { toast } from 'react-toastify';

type State = {
  recipe: Recipe;
  working: boolean;
  ingredients: Ingredient[];
  ingredientItems: IngredientItem[];
  loadingRecipe: boolean;
  loadingIngredient: boolean;
  loadingIngredientItems: boolean;
  editing: boolean;
};

class RecipeView extends PureComponent<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipe: null,
      working: false,
      ingredients: [],
      ingredientItems: [],
      loadingRecipe: true,
      loadingIngredient: true,
      loadingIngredientItems: true,
      editing: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    recipeService.getRecipe(id)
      .then(recipe => {
        this.setState({
          recipe,
          loadingRecipe: false
        });
      });

    recipeService.getIngredientItems(id)
      .then(ingredientItems => {
        this.setState({
          ingredientItems,
          loadingIngredientItems: false
        });
      });

    ingredientService.getIngredients()
      .then(ingredients => {
        this.setState({
          ingredients,
          loadingIngredient: false
        });
      });
  }

  addIngredient = (newIngredientItem: IngredientItem) => {
    const { ingredients, recipe, ingredientItems } = this.state;

    this.setState({
      working: true
    });

    if (!ingredients.find(i => i.name === newIngredientItem.name)) {
      ingredientService.addIngredient(newIngredientItem.name);
    }
    recipeService.addIngredientItem(recipe.id, newIngredientItem)
      .then(() => {
        this.setState({
          ingredientItems: [...ingredientItems, newIngredientItem],
          working: false
        });
        toast.success("Added!");
      })
  }

  deleteIngredient = (ingredientItemId: string) => {
    const { recipe, ingredientItems } = this.state;

    this.setState({ working: true });
    recipeService.deleteIngredientItem(recipe.id, ingredientItemId)
      .then(() => {
        this.setState({
          ingredientItems: ingredientItems.filter(i => i.id != ingredientItemId),
          working: false
        })
        toast.success("Deleted!");
      })
  }

  toggleEdit = () => {
    this.setState((prevState) => {
      return {
        editing: !prevState.editing
      }
    })
  }

  updateRecipe = (key: string, value: string) => {
    const { recipe } = this.state;

    recipeService.updateRecipe(recipe.id, key, value)
      .then(() => {
        this.setState({
          recipe: { ...recipe, [key]: value }
        })
      })
  }

  render() {
    const { recipe, ingredients, ingredientItems, editing } = this.state;

    return (
      <>
        <Header />
        <RecipeHeaderElement
          recipe={recipe}
          ingredientItems={ingredientItems}
          editing={editing}
          updateRecipe={this.updateRecipe}
          toggleEdit={this.toggleEdit}
        />
        {!this.state.loadingRecipe && !this.state.loadingIngredient &&
          <>
            <IngredientsElement
              editing={editing}
              ingredients={ingredients}
              ingredientItems={ingredientItems}
              addIngredient={this.addIngredient}
              deleteIngredient={this.deleteIngredient}
            />
            <StepsElement
              recipe={recipe}
            />
          </>
        }
      </>
    );
  }
}

export default withRouter(RecipeView);