import React, { Component } from "react";
import { Route, Switch } from "react-router";
import MainLayout from "./components/Layout/MainLayout";
import { IngredientView } from "./components/Recipes/Components/IngredientView";
import RecipesView from "./components/Recipes/Components/RecipesView";
import RecipeView from "./components/Recipes/Components/RecipeView";
import IngredientsView from "./components/Ingredients/Components/IngredientsView";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" render={() => <MainLayout><RecipesView /></MainLayout>} />
          <Route path="/recipes" render={() => <MainLayout><RecipesView /></MainLayout>} />
          <Route path="/recipe/:id" render={() => <MainLayout><RecipeView /></MainLayout>} />
          <Route path="/ingredients" render={() => <MainLayout><IngredientsView /></MainLayout>} />
          <Route path="/ingredients" render={() => <MainLayout><IngredientView /></MainLayout>} />/>
        </Switch>
      </>
    );
  }
}

export default App;
