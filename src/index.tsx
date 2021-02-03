import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { configureStore } from "@reduxjs/toolkit";
import { App } from "app";
import { userReducer, UserState } from "modules/user/store/user-slice";
import { cartReducer, CartState } from "modules/cart/store/cart-reducer";
import { recipeReducer, RecipeState } from "modules/recipes/store/recipe-reducer";
import { recipesReducer, RecipesState } from "modules/recipes/store/recipes-reducer";
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
