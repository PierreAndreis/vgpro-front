import React, { Component } from 'react';
import { connect } from "react-redux";

import './styles/normalize.style.js';
import './styles/App.style.js';

import Layout from "./components/layout";

import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Themes from "./themes";

class App extends Component {

  render() {

    const { currentTheme } = this.props;

    let themeSchema = Themes.find(t => t.name === currentTheme);

    if (!themeSchema) themeSchema = Themes[0];

    return (
      <ThemeProvider theme={themeSchema}>
        <Router>
          <Layout/>
        </Router>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTheme: state.user.currentTheme
  }
}

export default connect(
  mapStateToProps
)(App);

