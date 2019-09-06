import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { firebaseReducer, ReactReduxFirebaseProvider } from "react-redux-firebase";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firestoreReducer } from "redux-firestore";
import { configureStore } from "redux-starter-kit";
import App from "./App";
import { firebase } from "./config";
import { cartReducer, CartState } from "./store/cart/cartReducer";
import { ingredientReducer, IngredientState } from "./store/ingredients/ingredientReducer";
import { recipeReducer, RecipeState } from "./store/recipes/recipeReducer";
import { recipesReducer, RecipesState } from "./store/recipes/recipesReducer";
import thunk from "redux-thunk";

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
  ingredients: IngredientState;
  recipe: RecipeState;
  recipes: RecipesState;
  cart: CartState;
  firebase: any;
  firestore: firebase.firestore.Firestore;
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
    firestore: firestoreReducer,
  },
  middleware: [thunk],
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
  </Provider>
  ,
  rootElement);
