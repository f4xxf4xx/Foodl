import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch } from "react-router";
import { ThemeProvider } from "styled-components";
import foodlTheme from "./foodlTheme";
import GuessRoute from "./layout/GuessRoute";
import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./layout/PrivateRoute";
import CartView from "./modules/Cart/Components/CartView";
import IngredientsView from "./modules/Ingredients/Components/IngredientsView";
import HomePage from "./modules/Pages/HomePage";
import RecipesView from "./modules/Recipes/Components/RecipesView";
import RecipeView from "./modules/Recipes/Components/RecipeView";
import LoginView from "./modules/User/Components/LoginView";

const App = () => {
  return (
    <ThemeProvider theme={foodlTheme}>
      <MuiThemeProvider theme={foodlTheme}>
        <Switch>
          <Route exact={true} path="/" render={() => <MainLayout><HomePage /></MainLayout>} />
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

export default App;
