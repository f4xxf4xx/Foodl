import React from "react";
import { Switch } from "react-router";
import PublicRoute from "layout/public-route";
import MainLayout from "layout/main-layout";
import { AppRoute } from "layout/app-route";
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
      <MainLayout>
        <Switch>
          <PublicRoute path="/" exact={true} component={OverviewView} />
          <PublicRoute path="/login" exact={true} component={LoginView} />
          <PublicRoute path="/register" exact={true} component={LoginView} />

          <AppRoute path="/recipes" component={RecipesView} />
          <AppRoute path="/recipe/:slug" component={RecipeView} />
          <AppRoute path="/cart" component={CartView} />
        </Switch>
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
