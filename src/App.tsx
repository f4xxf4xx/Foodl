import React from "react";
import { Route, Switch } from "react-router";
import GuessRoute from "layout/GuessRoute";
import MainLayout from "layout/MainLayout";
import PrivateRoute from "layout/PrivateRoute";
import CartView from "modules/Cart/Components/CartView";
import { LandingPage } from "modules/Pages/LandingPage";
import RecipesView from "modules/Recipes/Components/RecipesView";
import RecipeView from "modules/Recipes/Components/RecipeView";
import LoginView from "modules/User/Components/LoginView";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from 'styled-components';
import {
  faHome,
  faShoppingCart,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalStyle } from 'GlobalStyle';
import { theme } from 'theme';


library.add(faHome, faShoppingCart, faBook);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Switch>
        <Route
          exact={true}
          path="/"
          render={() => (
            <MainLayout>
              <LandingPage />
            </MainLayout>
          )}
        />
        <PrivateRoute
          path="/recipes"
          render={() => (
            <MainLayout>
              <RecipesView />
            </MainLayout>
          )}
        />
        <PrivateRoute
          path="/recipe/:slug"
          render={() => (
            <MainLayout>
              <RecipeView />
            </MainLayout>
          )}
        />
        <PrivateRoute
          path="/cart"
          render={() => (
            <MainLayout>
              <CartView />
            </MainLayout>
          )}
        />
        <GuessRoute
          path="/login"
          render={() => (
            <MainLayout>
              <LoginView />
            </MainLayout>
          )}
        />
        <GuessRoute
          path="/register"
          render={() => (
            <MainLayout>
              <LoginView />
            </MainLayout>
          )}
        />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
