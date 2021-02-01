import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { configureStore } from "@reduxjs/toolkit";
import { App } from "app";
import { userReducer, UserState } from "modules/user/store/user-slice";
import { cartReducer, CartState } from "store/cart/cart-reducer";
import { recipeReducer, RecipeState } from "store/recipes/recipe-reducer";
import { recipesReducer, RecipesState } from "store/recipes/recipes-reducer";
import "react-toastify/dist/ReactToastify.css";
import 'index.css';

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

toast.configure({
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

interface UserProfile {
  email: string;
}

interface DBCart {
  items: string[];
}

interface DBIngredientGroup {
  name: string;
  ingredients: string[];
}

interface DBStep {
  id?: string;
  order: number;
  text: string;
}

interface DBRecipe {
  id: string;
  name: string;
  slug: string;
  description?: string;
  cuisine?: string;
  duration?: string;
  type?: string;
  image: string;
  ingredients: string[];
  ingredientGroups: DBIngredientGroup[];
  steps: DBStep[];
}

// create schema for the DB
interface DBSchema {
  carts: DBCart;
  recipes: DBRecipe;
}

export interface ApplicationState {
  recipe: RecipeState;
  recipes: RecipesState;
  cart: CartState;
  user: UserState;
}

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    recipes: recipesReducer,
    cart: cartReducer,
    user: userReducer
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={baseUrl || ""}>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);
