import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configureStore } from "@reduxjs/toolkit";
import { firebaseReducer, ReactReduxFirebaseProvider, FirebaseReducer } from "react-redux-firebase";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { firebase } from "./config";
import { cartReducer, CartState } from "./store/cart/cartReducer";
import {
  ingredientReducer,
  IngredientState,
} from "./store/ingredients/ingredientReducer";
import { recipeReducer, RecipeState } from "./store/recipes/recipeReducer";
import { recipesReducer, RecipesState } from "./store/recipes/recipesReducer";

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
  email: string
}

export interface Cart {
  items: string[]
}

// create schema for the DB
interface DBSchema {
  todos: Cart
  [name: string]: any
}


export interface ApplicationState {
  ingredients: IngredientState;
  recipe: RecipeState;
  recipes: RecipesState;
  cart: CartState;
  firebase: FirebaseReducer.Reducer<UserProfile, DBSchema>;
}

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
};

const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    recipe: recipeReducer,
    recipes: recipesReducer,
    cart: cartReducer,
    firebase: firebaseReducer,
  },
});

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter basename={baseUrl}>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  rootElement
);
