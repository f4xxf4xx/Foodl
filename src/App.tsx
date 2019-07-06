import React, { Component } from "react";
import { Route, Switch } from "react-router";
import MainLayout from "./components/Layout/MainLayout";
import { IngredientView } from "./components/Recipes/Components/IngredientView";
import RecipesView from "./components/Recipes/Components/RecipesView";
import RecipeView from "./components/Recipes/Components/RecipeView";
import IngredientsView from "./components/Ingredients/Components/IngredientsView";
import HomePage from "./components/Layout/HomePage";
import CartView from "./components/Cart/Components/CartView";
import LoginView from "./components/User/Components/LoginView";
import PrivateRoute from "./components/Layout/PrivateRoute";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" render={() => <MainLayout><HomePage /></MainLayout>} />
          <Route path="/recipes" render={() => <MainLayout><RecipesView /></MainLayout>} />
          <Route path="/recipe/:id" render={() => <MainLayout><RecipeView /></MainLayout>} />
          <Route path="/ingredients" render={() => <MainLayout><IngredientsView /></MainLayout>} />
          <Route path="/ingredients" render={() => <MainLayout><IngredientView /></MainLayout>} />/>
          <PrivateRoute path="/cart" render={() => <MainLayout><CartView /></MainLayout>} />/>
          <Route path="/login" render={() => <MainLayout><LoginView /></MainLayout>} />/>
          <Route path="/register" render={() => <MainLayout><LoginView /></MainLayout>} />/>
        </Switch>
      </>
    );
  }
}

export default App;
