import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { MuiThemeProvider } from "@material-ui/core/styles";
import foodlTheme from "./foodlTheme";
import { ThemeProvider } from "styled-components";
import MainLayout from "./layout/MainLayout";
import HomePage from "./modules/Pages/HomePage";
import PrivateRoute from "./layout/PrivateRoute";
import RecipesView from "./modules/Recipes/Components/RecipesView";
import RecipeView from "./modules/Recipes/Components/RecipeView";
import IngredientsView from "./modules/Ingredients/Components/IngredientsView";
import CartView from "./modules/Cart/Components/CartView";
import GuessRoute from "./layout/GuessRoute";
import LoginView from "./modules/User/Components/LoginView";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={foodlTheme}>
        <MuiThemeProvider theme={foodlTheme}>
          <Switch>
            <Route exact path="/" render={() => <MainLayout><HomePage /></MainLayout>} />
            <PrivateRoute path="/recipes" render={() => <MainLayout><RecipesView /></MainLayout>} />
            <PrivateRoute path="/recipe/:id" render={() => <MainLayout><RecipeView /></MainLayout>} />
            <PrivateRoute path="/ingredients" render={() => <MainLayout><IngredientsView /></MainLayout>} />
            <PrivateRoute path="/cart" render={() => <MainLayout><CartView /></MainLayout>} />/>
            <GuessRoute path="/login" render={() => <MainLayout><LoginView /></MainLayout>} />/>
            <GuessRoute path="/register" render={() => <MainLayout><LoginView /></MainLayout>} />/>
          </Switch>
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }
}

export default App;
