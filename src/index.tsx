import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configureStore } from 'redux-starter-kit'
import { ingredientReducer, IngredientState } from './store/ingredients/ingredientReducer';
import { recipeReducer, cuisinesReducer, RecipeState } from './store/recipes/recipeReducer';
import { recipesReducer, RecipesState } from './store/recipes/recipesReducer';
import { cartReducer, CartState } from './store/cart/cartReducer';
import { userReducer, UserState } from './store/users/userReducer';
import { CuisinesState } from './store/recipes/recipeReducer';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
toast.configure({
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
})

export interface ApplicationState {
  ingredients: IngredientState;
  recipe: RecipeState;
  recipes: RecipesState;
  cart: CartState;
  cuisines: CuisinesState;
  user: UserState;
}

const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    recipe: recipeReducer,
    recipes: recipesReducer,
    cart: cartReducer,
    cuisines: cuisinesReducer,
    user: userReducer,
  }
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  rootElement);
