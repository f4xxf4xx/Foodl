import React, { Component, PureComponent } from 'react';
import { Fetcher } from '../../services/Fetcher';
import { Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Recipe } from './models';

type State = {
  recipes: Recipe[];
  loading: boolean;
  newRecipeName: string;
}

export class RecipesView extends PureComponent<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipes: [],
      loading: true,
      newRecipeName: ""
    };

    Fetcher.get("api/Recipe/get")
      .then(data => {
        this.setState({
          recipes: data,
          loading: false
        });
      });
  }

  updateRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newRecipeName: e.target.value });
  }

  addRecipe = () => {
    if (this.state.newRecipeName === "") {
      return;
    }

    const newRecipeInput = {
      name: this.state.newRecipeName
    }

    Fetcher.post('api/Recipe/add', newRecipeInput)
      .then((recipeId) => {
        this.props.history.push(`/recipe/${recipeId}`);
      });
  }

  deleteRecipe = (recipeId: number) => {
    const deleteRecipeInput = {
      id: recipeId
    }

    Fetcher.delete('api/recipe/delete', deleteRecipeInput)
      .then(response =>
        this.setState({
          recipes: this.state.recipes.filter(i => i.recipeId !== recipeId)
        })
      );
  }

  renderRecipes() {
    const { recipes } = this.state;

    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Recipes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) =>
            <tr key={index}>
              <td><Link to={`/recipe/${recipe.recipeId}`}>{recipe.name}</Link></td>
              <td><Button onClick={() => this.deleteRecipe(recipe.recipeId)}>DELETE</Button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <Container className="mt--7" fluid>
        {!this.state.loading &&
          this.renderRecipes()
        }
        <input type="text" onChange={this.updateRecipeName} value={this.state.newRecipeName}></input>
        <button onClick={this.addRecipe}>Create recipe</button>
      </Container>
    );
  }
}
