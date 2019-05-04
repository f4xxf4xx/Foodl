import React, { Component, PureComponent } from 'react';
import { Fetcher } from '../../services/Fetcher';
import { Button, Container } from 'reactstrap';
import { Recipe, Ingredient, InputAddIngredientItem } from './models';
import { withRouter } from 'react-router-dom';

type State = {
  recipe: Recipe;
  ingredients: Ingredient[];
  loadingRecipe: boolean;
  loadingIngredient: boolean;
}

class RecipeView extends PureComponent<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipe: null,
      ingredients: [],
      loadingRecipe: true,
      loadingIngredient: true
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    Fetcher.get(`api/Recipe/get/${id}`)
      .then(recipe => {
        this.setState({
          recipe,
          loadingRecipe: false
        });
      })

    Fetcher.get("api/Ingredient/get")
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

  renderRecipe() {
    const { recipe, ingredients } = this.state;

    return (
      <div>
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredientItems && recipe.ingredientItems.map((ingredientItem, index) => {
            //const ingredientName = this.state.ingredients.find(ingredient => ingredient.ingredientId === ingredientItem.ingredientId).name;
            return <li key={index}>{ingredientItem.ingredient.name} <Button onClick={() => { }}>Add to cart</Button></li>
          })}
        </ul>
        <h2>Steps</h2>
        <ol>
          {recipe.recipeSteps && recipe.recipeSteps.map((recipeStep, index) => {
            return <li key={index}>{recipeStep.description}</li>
          })}
        </ol>
        <h2>Add ingredient</h2>
        <select>
          {ingredients.map((ingredient, index) =>
            <option key={index}>{ingredient.name}</option>
          )}
        </select>
      </div>
    );
  }

  render() {
    return (
      <Container className="mt--7" fluid>
        {!this.state.loadingRecipe && !this.state.loadingIngredient &&
          this.renderRecipe()
        }
      </Container>
    );
  }
}

export default withRouter(RecipeView);