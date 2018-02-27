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
    builds: "#979731",
    buildsHover: "rgba(230, 230, 230, 0.514)",
    buildsSpanColor: "rgb(109, 109, 109)",
    buildsSpanCssColor: "#E5C05E",
    buildsPlayerBorder: "#4A90E2",
    buildsPlayerLastBorder: "#FF6262",
    buildsContentBorder: "rgba(128, 128, 128, 0.212)",
    buildsContentH2Color: "#DCAF5A",
    buildsAbilityBorder: "#BDBDBD",
    buildsAbilityCssBackground: "#E8A827",
    buildsGroupBorder: "#A7A7A7",
    buildsGroupSpanBackground: "rgb(146, 146, 146)",
    buildsItemSpanBackground: "rgb(247, 64, 64)",
    detailsContainerBoxShadow: "#EAEDF3",
    detailsTabOptionColor: "rgb(75, 75, 75)",
    detailsTabOptionHover: "rgba(207, 207, 207, 0.24)",
    white: "white"
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
    "300": "#9B9B9B",
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
