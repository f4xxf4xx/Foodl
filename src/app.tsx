import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router";
import { MainLayout } from "layout/main-layout";
import { AppRoute } from "layout/app-route";
import { PublicRoute } from "layout/public-route";
import { NotFound } from "layout/not-found";
import CartView from "modules/cart/components/cart-view";
import { OverviewView } from "modules/public/components/overview-view";
import RecipesView from "modules/recipes/components/recipes-view";
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
          <PublicRoute path="/" exact={true} component={OverviewView} />
          <PublicRoute path="/login" exact={true} component={LoginView} />
          <PublicRoute path="/register" exact={true} component={LoginView} />

          <AppRoute path="/app/recipes" component={RecipesView} />
          <AppRoute path="/app/recipe/:slug" component={RecipeView} />
          <AppRoute path="/app/cart" component={CartView} />
          <Route component={NotFound} />
        </Switch>
      </MainLayout>
    </ThemeProvider>
  );
};
