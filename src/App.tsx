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
import GuessRoute from "./components/Layout/GuessRoute";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import foodlTheme from "./foodlTheme";
import { ThemeProvider } from "styled-components";

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
            <PrivateRoute path="/ingredients" render={() => <MainLayout><IngredientView /></MainLayout>} />/>
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
