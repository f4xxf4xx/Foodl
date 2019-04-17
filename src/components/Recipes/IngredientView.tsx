import React, { Component } from 'react';
import { Fetcher } from '../../services/Fetcher';
import { Button } from 'reactstrap';
import { BarLoader } from 'react-spinners';
import { Ingredient } from './models';

type State = {
  ingredients: Ingredient[];
  loading: boolean;
  newIngredientName: string;
}

export class IngredientView extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      ingredients: [],
      loading: true,
      newIngredientName: ""
    };

    Fetcher.get("api/Ingredient/get")
      .then(data => {
        this.setState({
          ingredients: data,
          loading: false
        });
      });
  }

  updateIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newIngredientName: e.target.value });
  }

  addIngredient = () => {
    if (this.state.newIngredientName === null) {
      return;
    }

    const newIngredientInput = {
      name: this.state.newIngredientName
    }

    Fetcher.post('api/Ingredient/add', newIngredientInput)
      .then((id) =>
        this.setState({
          newIngredientName: "",
          ingredients: [...this.state.ingredients, { name: this.state.newIngredientName, ingredientId: id }]
        })
      );
  }

  deleteIngredient = (ingredientId: number) => {
    const deleteIngredientInput = {
      id: ingredientId
    }

    Fetcher.delete('api/Ingredient/delete', deleteIngredientInput)
      .then(response =>
        this.setState({
          ingredients: this.state.ingredients.filter(i => i.ingredientId !== ingredientId)
        })
      );
  }

  renderIngredients() {
    const { ingredients } = this.state;

    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) =>
            <tr key={index}>
              <td>{ingredient.name}</td>
              <td><Button onClick={() => this.deleteIngredient(ingredient.ingredientId)}>DELETE</Button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <>
        {this.state.loading ? <BarLoader /> :
          this.renderIngredients()
        }
        <input type="text" onChange={this.updateIngredient} value={this.state.newIngredientName}></input>
        <button onClick={this.addIngredient}>Add ingredient</button>
      </>
    );
  }
}
