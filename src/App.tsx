import React from "react";
import { Route, Switch } from "react-router";
import GuessRoute from "./layout/GuessRoute";
import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./layout/PrivateRoute";
import CartView from "./modules/Cart/Components/CartView";
import HomePage from "./modules/Pages/HomePage";
import RecipesView from "./modules/Recipes/Components/RecipesView";
import RecipeView from "./modules/Recipes/Components/RecipeView";
import LoginView from "./modules/User/Components/LoginView";

const App: React.FC = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path="/"
        render={() => (
          <MainLayout>
            <HomePage />
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
        path="/recipe/:id"
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
  );
};

export default App;
