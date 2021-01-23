import React from "react";
import { Switch, Route } from "react-router";
import { MainLayout } from "layout/main-layout";
import { AppNav } from "layout/app-nav";
import { PublicNav } from "layout/public-nav";
import { AppRoute } from "layout/app-route";
import { PublicRoute } from "layout/public-route";
import CartView from "modules/cart/components/cart-view";
import { OverviewView } from "modules/public/components/overview-view";
import RecipesView from "modules/recipes/components/recipes-view";
import RecipeView from "modules/recipes/components/recipe-view";
import { LoginView } from "modules/user/components/login-view";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from 'styled-components';
import {
  faHome,
  faShoppingCart,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalStyle } from 'global-style';
import { theme } from 'theme';


library.add(faHome, faShoppingCart, faBook);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Switch>
        <AppRoute path="/app">
          <MainLayout homePath="/app" nav={<AppNav />}>
            <Switch>
              <Route path="/recipes" component={RecipesView} />
              <Route path="/recipe/:slug" component={RecipeView} />
              <Route path="/cart" component={CartView} />
            </Switch>
          </MainLayout>
        </AppRoute>
        <PublicRoute path="/">
          <MainLayout homePath="/" nav={<PublicNav />}>
            <Switch>
              <Route path="/" exact={true} component={OverviewView} />
              <Route path="/login" exact={true} component={LoginView} />
              <Route path="/register" exact={true} component={LoginView} />
            </Switch>
          </MainLayout>
        </PublicRoute>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
