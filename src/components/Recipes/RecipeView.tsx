import React, { PureComponent } from 'react';
import { Fetcher } from '../../services/Fetcher';
import { Container } from 'reactstrap';
import { Recipe, InputAddIngredientItem } from './models';
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
  loadingRecipe: boolean;
  loadingIngredient: boolean;
  editing: boolean;
}

class RecipeView extends PureComponent<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipe: null,
      ingredients: [],
      loadingRecipe: true,
      loadingIngredient: true,
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

    ingredientService.getIngredients()
      .then(ingredients => {
        this.setState({
          ingredients,
          loadingIngredient: false
        });
      });
  }

  addIngredient = (recipeId: number, name: string) => {
    const { ingredients } = this.state;
    const newIngredientInput: InputAddIngredientItem = {
      recipeId: recipeId,
      name: undefined
    }

    if (ingredients.find(i => i.name === name)) {
      newIngredientInput.name = name;
    }

    Fetcher.post('api/Recipe/add/ingredient', newIngredientInput)
      .then(() => {
        Fetcher.get(`api/Recipe/get/${recipeId}`)
          .then(recipe => {
            this.setState({
              recipe
            });
          })
      });
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
    const { recipe, ingredients, editing } = this.state;

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
                recipe={recipe}
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