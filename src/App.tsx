import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import AdminLayout from "./layouts/Admin.jsx";

class App extends Component {
  render() {
    return (            
      <Switch>
        <Route exact path='/' render={props => <AdminLayout {...props} />}/>
        <Route path='/recipes' render={props => <AdminLayout {...props} />}/>
        <Route path='/recipe/:id' render={props => <AdminLayout {...props} />}/>
        <Route path='/ingredients' render={props => <AdminLayout {...props} />}/>
        <Route path='/index' render={props => <AdminLayout {...props} />}/>
        <Route path='/icons' render={props => <AdminLayout {...props} />}/>
        <Route path='/maps' render={props => <AdminLayout {...props} />}/>
        <Route path='/user-profile' render={props => <AdminLayout {...props} />}/>
        <Route path='/tables' render={props => <AdminLayout {...props} />}/>
        <Route path='/login' render={props => <AdminLayout {...props} />}/>
        <Route path='/register' render={props => <AdminLayout {...props} />}/>
      </Switch>
    );
  }
}

export default App;
