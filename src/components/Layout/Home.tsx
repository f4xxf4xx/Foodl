import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome on Foodl 2.0</h1>
        <ul>
          <li>Access the <strong>Recipes</strong> page to have a list of public recipes made by other users</li>
          <li>Access the <strong>My cookbook</strong> page to find your own private cookbook</li>
        </ul>
      </div>
    );
  }
}
