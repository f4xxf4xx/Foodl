import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router";
import { MainLayout } from "layout/main-layout";
import { AppRoute } from "layout/app-route";
import { PublicRoute } from "layout/public-route";
import { NotFound } from "layout/not-found";
import CartView from "modules/cart/components/cart-view";
import { OverviewView } from "modules/public/components/overview-view";
import RecipesView from "modules/recipes/components/recipes-view";
import CookbooksView from "modules/cookbooks/components/cookbooks-view"
import RecipeView from "modules/recipes/components/recipe-view";
import { LoginView } from "modules/user/components/login-view";
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'global-style';
import { theme } from 'theme';
import { useDispatch } from "react-redux";
import { auth } from "firebase-config";
import { loginAction, mapUser } from "modules/user/store/user-slice";

export const App: React.FC = () => {
  const dispatch = useDispatch()
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    if (user) {
      dispatch(loginAction(mapUser(user)))
    }
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return <p>Loading user...</p>
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainLayout>
        <Switch>
          <PublicRoute path="/" exact component={OverviewView} />
          <PublicRoute path="/login" exact component={LoginView} />
          <PublicRoute path="/register" exact component={LoginView} />

          <AppRoute path="/app/cookbooks" exact component={CookbooksView} />
          <AppRoute path="/app/cookbooks/:cookbookId" exact component={RecipesView} />
          <AppRoute path="/app/recipes" exact component={RecipesView} />
          <AppRoute path="/app/recipe/:slug" exact component={RecipeView} />
          <AppRoute path="/app/cart" exact component={CartView} />
          <Route component={NotFound} />
        </Switch>
      </MainLayout>
    </ThemeProvider>
  );
};
