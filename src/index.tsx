import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configureStore } from 'redux-starter-kit'
import { ingredientReducer } from './components/Ingredients/ingredientReducer';
import { recipeReducer, cuisinesReducer } from './components/Recipes/recipeReducer';
import { recipesReducer } from './components/Recipes/recipesReducer';
import { cartReducer } from './components/Cart/cartReducer';
import { userReducer } from './components/User/userReducer';

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

const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    recipe: recipeReducer,
    recipes: recipesReducer,
    cart: cartReducer,
    cuisines: cuisinesReducer,
    user: userReducer
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
