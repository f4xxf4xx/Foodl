import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { Home } from './components/Layout/Home';
import { RecipesView } from './components/Recipes/RecipesView';
import { RecipeView } from './components/Recipes/RecipeView';
import { IngredientView } from './components/Recipes/IngredientView';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/recipes' component={RecipesView} />
        <Route path='/recipe/:id' component={RecipeView} />
        <Route path='/ingredients' component={IngredientView} />
      </Layout>
    );
  }
}

export default App;
