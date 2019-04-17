import React, { Component, PureComponent } from 'react';
import { Fetcher } from '../../services/Fetcher';
import { Button } from 'reactstrap';
import { Recipe, Ingredient, InputAddIngredientItem } from './models';

type State = {
  recipe: Recipe;
  ingredients: Ingredient[];
  loadingRecipe: boolean;
  loadingIngredient: boolean;
}

export class RecipeView extends PureComponent<any, State> {
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
        <h2>Current ingredients</h2>
        {recipe.ingredientItems && recipe.ingredientItems.map((ingredientItem, index) => {
          const ingredientName = this.state.ingredients.find(ingredient => ingredient.ingredientId === ingredientItem.ingredientId).name;
          return <li key={index}>{ingredientName}</li>
        })}
        <h2>Add ingredient</h2>
        <ul>
          {ingredients.map((ingredient, index) =>
            <li key={index}>{ingredient.name} <Button onClick={() => this.addIngredient(recipe.recipeId, ingredient.name)}>ADD TO RECIPE</Button></li>
          )}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <>
        {!this.state.loadingRecipe && !this.state.loadingIngredient &&
          this.renderRecipe()
        }
      </>
    );
  }
}
