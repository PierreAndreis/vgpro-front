import React, { Component } from 'react';

import './styles/normalize.style.js';
import './styles/App.style.js';

import Layout from "./components/layout";

import {
  BrowserRouter as Router,
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <Router>
        <Layout/>
      </Router>
    );
  }
}

export default App;
