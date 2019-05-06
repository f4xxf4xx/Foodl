import React, { PureComponent } from 'react';
import { Fetcher } from '../../services/Fetcher';
import { Button, Container, Row, Col, Table, Media } from 'reactstrap';
import { Recipe, Ingredient, InputAddIngredientItem, IngredientItem, InputUpdateRecipeName, InputUpdateRecipeDescription } from './models';
import { withRouter } from 'react-router-dom';
import Statistic from '../Layout/Statistic';
import TopNavbar from '../Layout/TopNavbar';
import Header from '../Layout/Header';
import SectionHeaderElement from '../Section/SectionHeaderElement';
import Input from 'reactstrap/lib/Input';
import IngredientsElement from './IngredientsElement';
import StepsElement from './StepsElement';
import RecipeHeaderElement from './RecipeHeaderElement';

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

  toggleEdit = () => {
    this.setState((prevState) => {
      return {
        editing: !prevState.editing
      }
    })
  }

  updateRecipeName = (name: string) => {
    const { recipe } = this.state;
    const updateRecipeName: InputUpdateRecipeName = {
      recipeId: recipe.recipeId,
      name: name
    }

    Fetcher.patch("api/Recipe/updateName", updateRecipeName)
      .then(() => {
        this.setState({
          recipe: { ...recipe, name: name }
        })

      })
  }
  
  updateRecipeDescription = (text: string) => {
    const { recipe } = this.state;
    const updateRecipeDescription: InputUpdateRecipeDescription = {
      recipeId: recipe.recipeId,
      text: text
    }

    Fetcher.patch("api/Recipe/updateDescription", updateRecipeDescription)
      .then(() => {
        this.setState({
          recipe: { ...recipe, description: text }
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
            updateRecipeName={this.updateRecipeName}
            updateRecipeDescription={this.updateRecipeDescription}
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