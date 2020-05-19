import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configureStore } from "@reduxjs/toolkit";
import {
  firebaseReducer,
  ReactReduxFirebaseProvider,
  FirebaseReducer,
} from "react-redux-firebase";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { firebase } from "./config";
import { cartReducer, CartState } from "./store/cart/cartReducer";
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
  firebase: FirebaseReducer.Reducer<UserProfile, DBSchema>;
}

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
};

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    recipes: recipesReducer,
    cart: cartReducer,
    firebase: firebaseReducer,
  },
});

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter basename={baseUrl || ""}>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  rootElement
);
