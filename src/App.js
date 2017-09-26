import React, { Component } from 'react';

import './styles/normalize.css';
import './styles/base.css';
import './styles/base.resp.css';

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
