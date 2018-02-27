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
    overviewCellHeader: "#EAEAEA",
    overviewCellPlayer: "rgba(75, 75, 75, 0.041)",
    overviewPlayerHero: "rgb(201, 201, 201)",
    overviewPlayerRoleCaptain: "rgb(191, 150, 1)",
    overviewPlayerRoleCarry: "rgb(160, 46, 45)",
    overviewPlayerRoleJungler: "rgb(106, 183, 11)",
    overviewPlayerRoleSub: "rgb(49, 49, 49)",
    overviewPlayerName: "#3A3A3A",
    overviewPlayerKDA: "rgb(179, 32, 32)",
    overviewGameStats: "rgb(53, 53, 53)",
    overviewPlayerGraphBar: "rgba(95, 95, 95, 0.356)",
    matchBorder: "#F1685D",
    matchBorderWinner: "#5DB4F1",
    matchHover: "rgb(247, 247, 247)",
    matchAvatar: "rgb(190, 190, 190)",
    matchAvatarBorder: "#9C9C9C",
    matchTime: "#B1B1B1",
    matchKdaDeath: "rgb(192, 61, 61)",
    matchPlayerColor: "#E6C156",
    matchHero: "#499BD2",
    matchLastHero: "#E64659",
    searchIcon: "rgba(0, 0, 0, 0.459)",
    searchInput: "rgb(230, 230, 230)",
    searchMainBar: "rgb(110, 112, 117)",
    searchMainBarInputShadow: "rgba(0, 0, 0, 0.1)",
    searchBarButtonError: "rgba(243, 156, 156, 0.747)",
    searchMenuContentHover: "rgba(99, 99, 99, 0.1)",
    searchMenuContentSpan: "rgb(99, 99, 99)",
    boxShadow: "rgba(0, 14, 77, 0.07)",
    boxHoverCss: "rgba(0, 0, 0, 0.055)",
    boxButtonHoverBackground: "#f7d05b",
    boxButtonHoverShadow: "#e4b727",
    boxButtonDisabledBackground: "#d3d2d3",
    boxButtonDisabledColor: "#565656",
    soonColor: "rgba(71, 71, 71, 0.404)",
    heroTag: "rgb(73, 73, 73)",
    heroTag3: "#A54916",
    leadMemberPosition: "rgba(234, 203, 93, 1)",
    leadMemberName: "rgba(57, 57, 57, 1)",
    leadMemberNameSpan: "rgba(161, 161, 161, 1)",
    leadMemberSkill: "#A3A3A3",
    leadMemberPoints: "rgba(134, 200, 91, 1)",
    leadMemberPointsName: "rgba(130, 130, 130, 1)",
    feedWrapperHover: "#E7E7E7",
    feedStatusWinner: "hsl(205, 86%, 65%)",
    feedStatusLoser: "hsl(6, 86%, 65%)",
    feedPlayerPictureBackground: "rgb(80, 80, 80)",
    feedPlayerDetailsSpan: "#2E2E2E",
    feedItem: "rgba(195, 195, 195, 1)",
    feedArrow: "rgba(195, 195, 195, 0.6)",
    white: "white",
    black: "black",
    grey: "grey",
    red: "red",
    transparent: "transparent"
  },
  gradient: {
    "primary": "linear-gradient(-90deg, #F3DD5C 0%, #E7AE2A 100%)",
    "red": "radial-gradient(50% 100%, #F5515F 44%, #9F041B 0%)",
    "green": "radial-gradient(0% 100%, #B4EC51 51%, #429321 47%)",
    "orange": "radial-gradient(0% 50%, #FAD961 45%, #F76B1C 41%)",
    "boxDividerBackground": "linear-gradient(to top, rgba(0,0,0,0.05) 0%,rgba(0,0,0,0) 100%)",
    "skeletonStyletonCss": "linear-gradient(90deg,rgba(102, 107, 109, 0.192),rgba(184, 193, 197, 0.4),rgba(186, 194, 197, 0.2))"
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
