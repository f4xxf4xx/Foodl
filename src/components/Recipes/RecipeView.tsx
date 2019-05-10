import React, { PureComponent } from 'react';
import { Container } from 'reactstrap';
import { Recipe, IngredientItem } from './models';
import { withRouter } from 'react-router-dom';
import TopNavbar from '../Layout/TopNavbar';
import Header from '../Layout/Header';
import IngredientsElement from './IngredientsElement';
import StepsElement from './StepsElement';
import RecipeHeaderElement from './RecipeHeaderElement';
import { recipeService } from './recipeService';
import { ingredientService } from '../Ingredients/ingredientService';
import { Ingredient } from '../Ingredients/models';

type State = {
  recipe: Recipe;
  ingredients: Ingredient[];
  ingredientItems: IngredientItem[];
  loadingRecipe: boolean;
  loadingIngredient: boolean;
  loadingIngredientItems: boolean;
  editing: boolean;
}

class RecipeView extends PureComponent<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipe: null,
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
      })

    recipeService.getIngredientItems(id)
      .then(ingredientItems => {
        this.setState({
          ingredientItems,
          loadingIngredientItems: false
        });
      })

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

    if (!ingredients.find(i => i.name === newIngredientItem.name)) {
      ingredientService.addIngredient(newIngredientItem.name);
    }
    recipeService.addIngredientItem(recipe.id, newIngredientItem)
      .then(() => {
        this.setState({
          ingredientItems: [...ingredientItems, newIngredientItem]
        });
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
        <TopNavbar />
        <Header />
        <Container className="mt--7" fluid>
          <RecipeHeaderElement
            recipe={recipe}
            col="12"
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
              />
              <StepsElement
                recipe={recipe}
              />
            </>
          }
        </Container>
      </>
    );
  }
}

export default withRouter(RecipeView);