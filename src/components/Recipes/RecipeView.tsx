import React, { Component, PureComponent } from 'react';
import { Fetcher } from '../../services/Fetcher';
import { Button, Container, Row, Col, Table, Media } from 'reactstrap';
import { Recipe, Ingredient, InputAddIngredientItem } from './models';
import { withRouter } from 'react-router-dom';
import Statistic from '../Layout/Statistic';
import TopNavbar from '../Layout/TopNavbar';
import Header from '../Layout/Header';
import SectionHeaderElement from '../Section/SectionHeaderElement';
import SectionElement from '../Section/SectionElement';
import AvatarElement from '../Layout/AvatarElement';

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

  renderIngredients() {
    const { recipe, ingredients } = this.state;
    const button = (
      <Button onClick={() => { }}>
        Add ingredient
      </Button>
    )

    return (
      <SectionElement title="Ingredients" col="12" button={button}>
        <Table className="align-items-center table-flush" responsive>
          {/* <thead className="thead-light">
                    <tr>
                      <th scope="col">Project</th>
                      <th scope="col">Budget</th>
                      <th scope="col">Status</th>
                      <th scope="col">Users</th>
                      <th scope="col">Completion</th>
                      <th scope="col" />
                    </tr>
                  </thead> */}
          <tbody>
            {recipe.ingredientItems && recipe.ingredientItems.map((ingredientItem, index) => {
              return (
                <tr key={index}>
                  <th scope="row">
                    <AvatarElement text={ingredientItem.ingredient.name} imageUrl="../../assets/img/theme/vue.jpg" />
                  </th>
                  <td>
                    <Button onClick={() => { }}>Add to cart</Button>
                  </td>
                </tr>
              )
            })}


          </tbody>
        </Table>
        <select>
          {ingredients.map((ingredient, index) =>
            <option key={index}>{ingredient.name}</option>
          )}
        </select>
      </SectionElement>
    );
  }

  renderSteps() {
    const { recipe } = this.state;

    return (
      <SectionElement title="Steps" col="12">
        <ol>
          {recipe.recipeSteps && recipe.recipeSteps.map((recipeStep, index) => {
            return <li key={index}>{recipeStep.description}</li>
          })}
        </ol>
      </SectionElement>
    )
  }

  render() {
    const { recipe, ingredients } = this.state;
    return (
      <>
        <TopNavbar />
        <Header />
        <Container className="mt--7" fluid>
          <SectionHeaderElement
            title={recipe && recipe.name}
            subtitle={"Overview"}
            col="12"
          >
            <Row>
              <Col xl="4">
                <p className="text-light">
                  {recipe && recipe.description}
                </p>
              </Col>
              <Col xl="8">
                <Row>
                  <Statistic
                    name={"Duration"}
                    value={recipe && recipe.duration}
                    icon={"fa-clock"}
                    bgColor="bg-danger"
                    col="4"
                  />
                  <Statistic
                    name={"Ingredient number"}
                    value={recipe && recipe.ingredientItems.length}
                    icon={"fa-apple-alt"}
                    bgColor="bg-warning"
                    col="4"
                  />
                </Row>
              </Col>
            </Row>
          </SectionHeaderElement>
          {!this.state.loadingRecipe && !this.state.loadingIngredient &&
            <>
              {this.renderIngredients()}
              {this.renderSteps()}
            </>
          }
        </Container>
      </>
    );
  }
}

export default withRouter(RecipeView);