import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { firebaseReducer, getFirebase, reactReduxFirebase } from "react-redux-firebase";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firestoreReducer, getFirestore, reduxFirestore } from "redux-firestore";
import { configureStore } from "redux-starter-kit";
import thunk from "redux-thunk";
import App from "./App";
import { firebase } from "./config";
import { cartReducer, CartState } from "./store/cart/cartReducer";
import { ingredientReducer, IngredientState } from "./store/ingredients/ingredientReducer";
import { CuisinesState } from "./store/recipes/recipeReducer";
import { cuisinesReducer, recipeReducer, RecipeState } from "./store/recipes/recipeReducer";
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

export interface ApplicationState {
  ingredients: IngredientState;
  recipe: RecipeState;
  recipes: RecipesState;
  cart: CartState;
  cuisines: CuisinesState;
  firebase: firebase.app.App;
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
    cuisines: cuisinesReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  },
  enhancers: [
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
  ],
  middleware: [thunk.withExtraArgument({getFirebase, getFirestore})],
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  rootElement);
