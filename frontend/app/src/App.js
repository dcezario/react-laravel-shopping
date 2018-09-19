import React, { Component } from 'react';
import { Columns } from 'react-bulma-components/full';
import Header from './layout/Header';
require ('dotenv').config();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
