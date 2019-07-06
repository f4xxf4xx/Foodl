import React, { Component } from 'react';
import { Fetcher } from '../../../services/Fetcher';
import { Ingredient } from '../../Ingredients/models';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core';
import { Loader } from 'semantic-ui-react';

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
          ingredients: [...this.state.ingredients, { name: this.state.newIngredientName, id }]
        })
      );
  }

  deleteIngredient = (ingredientId: string) => {
    const deleteIngredientInput = {
      id: ingredientId
    }

    Fetcher.delete('api/Ingredient/delete', deleteIngredientInput)
      .then(response =>
        this.setState({
          ingredients: this.state.ingredients.filter(i => i.id !== ingredientId)
        })
      );
  }

  renderIngredients() {
    const { ingredients } = this.state;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell component="th">Ingredient</TableCell>
            <TableCell component="th">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.map((ingredient, index) =>
            <TableRow key={index}>
              <TableCell>{ingredient.name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.deleteIngredient(ingredient.id)}
                >
                  DELETE
              </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }

  render() {
    return (
      <>
        {this.state.loading ? <Loader active inline='centered' /> :
          this.renderIngredients()
        }
        <input type="text" onChange={this.updateIngredient} value={this.state.newIngredientName}></input>
        <button onClick={this.addIngredient}>Add ingredient</button>
      </>
    );
  }
}
