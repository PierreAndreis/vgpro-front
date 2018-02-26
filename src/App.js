import React, { Component } from 'react';

import './styles/normalize.style.js';
import './styles/App.style.js';

import Layout from "./components/layout";

import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';



const theme = {
  font: {
    body: "Roboto",
    highlight: "Roboto Condensed",
  },
  primary: {
    500: "#c29b3b",
    400: "#E6BE3D",
    300: "#F8CC6A",
    100: "#faf3d9",
  },
  text: {
    500: "#4A4A4A",
    300: "#9B9B9B",
    100: "#D8D8D8"
  },
  background: {
    primary: "#ECEEF1",
    secondary: "#FAFAFA",
    third: "hsla(0,0%,76%,.3)",
    box: "#FFFFFF",
    boxOdd: "#f1f1f1",
  },
  gradient: {
    "primary": "linear-gradient(-90deg, #F3DD5C 0%, #E7AE2A 100%)",
    "red": "radial-gradient(50% 100%, #F5515F 44%, #9F041B 0%)",
    "green": "radial-gradient(0% 100%, #B4EC51 51%, #429321 47%)",
    "orange": "radial-gradient(0% 50%, #FAD961 45%, #F76B1C 41%)"
  }
}

const darkTheme = {
  font: {
    body: "Roboto",
    highlight: "Roboto Condensed",
  },
  primary: {
    500: "#c29b3b",
    400: "#E6BE3D",
    300: "#F8CC6A",
    100: "#faf3d9",
  },
  text: {
    500: "#4A4A4A",
    300: "#9B9B9B",
    100: "#D8D8D8"
  },
  background: {
    primary: "black",
    secondary: "black",
    third: "hsla(0,0%,76%,.3)",
    box: "black",
    boxOdd: "#f1f1f1",
  },
  gradient: {
    "primary": "linear-gradient(-90deg, #F3DD5C 0%, #E7AE2A 100%)",
    "red": "radial-gradient(50% 100%, #F5515F 44%, #9F041B 0%)",
    "green": "radial-gradient(0% 100%, #B4EC51 51%, #429321 47%)",
    "orange": "radial-gradient(0% 50%, #FAD961 45%, #F76B1C 41%)"
  }
}


class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Layout/>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
