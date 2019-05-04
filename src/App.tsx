import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import MainLayout from "./layouts/MainLayout";
import Index from './components/Views/Index';
import { IngredientView } from './components/Recipes/IngredientView';
import Icons from './components/Views/Icons';
import Maps from './components/Views/Maps';
import Profile from './components/Views/Profile';
import Tables from './components/Views/Tables';
import Login from './components/Views/Login';
import Register from './components/Views/Register';
import Auth from './layouts/Auth';
import RecipesView from './components/Recipes/RecipesView';
import RecipeView from './components/Recipes/RecipeView';

class App extends Component {
  render() {
    return (            
      <Switch>
        <Route exact path='/' render={() => <MainLayout><Index/></MainLayout>}/>
        <Route path='/recipes' render={() => <MainLayout><RecipesView/></MainLayout>}/>
        <Route path='/recipe/:id' render={() => <MainLayout><RecipeView/></MainLayout>}/>
        <Route path='/ingredients' render={() => <MainLayout><IngredientView/></MainLayout>}/>
        <Route path='/icons' render={() => <MainLayout><Icons/></MainLayout>}/>
        <Route path='/maps' render={() => <MainLayout><Maps/></MainLayout>}/>
        <Route path='/user-profile' render={() => <MainLayout><Profile/></MainLayout>}/>
        <Route path='/tables' render={() => <MainLayout><Tables/></MainLayout>}/>
        <Route path='/login' render={() => <Auth><Login/></Auth>}/>
        <Route path='/register' render={() => <Auth><Register/></Auth>}/>
      </Switch>
    );
  }
}

export default App;
