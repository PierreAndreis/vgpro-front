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
    200: "#eed477",
    100: "#faf3d9",
  },
  text: {
    solid: "#000000",
    500: "#3A3A3A",
    400: "#4A4A4A",
    300: "#9B9B9B",
    200: "rgba(195, 195, 195, 1)",
    100: "#D8D8D8"
  },
  extra: {
    "win": "#5DB4F1",
    "loss": "#F1685D",
    "blueSide": "#4A90E2",
    "redSide": "#FF6262",
    "carry": "#a02e2d",
    "captain": "#bf9601",
    "jungler": "#6ab70b",
    "sub": "#313131",
    "commonMedal": "#494949",
    "goldMedal": "#E8A827",
    "silverMedal": "#9B9B9B",
    "bronzeMedal": "#A54916",
  },
  shadow: "rgba(0, 0, 0, 0.1)",
  background: {
    primary: "#ECEEF1",
    secondary: "#FAFAFA",
    third: "#c2c2c2",
    box: "#FFFFFF",
    boxHover: "rgb(247, 247, 247)",
    listOdd: "#f1f1f1",
    listHover: "#E7E7E7",
    slot: "#c9c9c9",
    slotBorder: "#808080",
    footer: "#383838",
  },
  gradient: {
    "primary": "linear-gradient(-90deg, #F3DD5C 0%, #E7AE2A 100%)",
    "red": "radial-gradient(50% 100%, #F5515F 44%, #9F041B 0%)",
    "green": "radial-gradient(0% 100%, #B4EC51 51%, #429321 47%)",
    "orange": "radial-gradient(0% 50%, #FAD961 45%, #F76B1C 41%)",
    "boxDividerBackground": "linear-gradient(to top, rgba(0,0,0,0.05) 0%,rgba(0,0,0,0) 100%)",
    "skeleton": "linear-gradient(90deg,rgba(102, 107, 109, 0.192),rgba(184, 193, 197, 0.4),rgba(186, 194, 197, 0.2))"
  }
};

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
    500: "#FFFFFF",
    300: "#FFFFFF",
    100: "#FFFFFF"
  },
  background: {
    primary: "black",
    secondary: "black",
    third: "hsla(0,0%,76%,.3)",
    box: "#1B2937",
    boxOdd: "rgba(51, 62, 84, 0.54)",
    builds: "#979731",
    buildsHover: "rgba(128, 128, 128, 0.205)",
    buildsSpanColor: "rgb(109, 109, 109)",
    // buildsSpanCssColor: "#E5C05E",
    // buildsPlayerBorder: "#4A90E2",
    // buildsPlayerLastBorder: "#FF6262",
    buildsContentBorder: "#273C50",
    // buildsContentH2Color: "#DCAF5A",
    buildsAbilityBorder: "white",
    // buildsAbilityCssBackground: "#E8A827",
    buildsGroupBorder: "white",
    buildsGroupSpanBackground: "white",
    buildsItemSpanBackground: "grey",
    detailsContainerBoxShadow: "black",
    detailsTabOptionColor: "white",
    detailsTabOptionHover: "rgba(128, 128, 128, 0.205)",
    overviewCellHeader: "rgba(51, 62, 84, 0.54)",
    overviewCellPlayer: "rgba(51, 62, 84, 0.54)",
    overviewPlayerHero: "white",
    overviewPlayerRoleCaptain: "rgb(191, 150, 1)",
    overviewPlayerRoleCarry: "rgb(160, 46, 45)",
    overviewPlayerRoleJungler: "rgb(106, 183, 11)",
    overviewPlayerRoleSub: "rgb(49, 49, 49)",
    overviewPlayerName: "white",
    overviewPlayerKDA: "rgb(179, 32, 32)",
    overviewGameStats: "white",
    overviewPlayerGraphBar: "rgba(95, 95, 95, 0.356)",
    matchBorder: "#F1685D",
    matchBorderWinner: "#5DB4F1",
    matchHover: "rgb(51,62,84)",
    matchAvatar: "rgb(190, 190, 190)",
    matchAvatarBorder: "#9C9C9C",
    matchTime: "#B1B1B1",
    matchKdaDeath: "rgb(192, 61, 61)",
    matchPlayerColor: "#E6C156",
    matchHero: "#499BD2",
    matchLastHero: "#E64659",
    searchIcon: "white",
    searchInput: "rgba(51, 62, 84, 0.54)",
    searchMainBar: "white",
    searchMainBarInputShadow: "rgba(0, 0, 0, 0.1)",
    searchBarButtonError: "#FF6262",
    searchMenuContentHover: "rgba(99, 99, 99, 0.1)",
    searchMenuContentSpan: "rgb(99, 99, 99)",
    boxTitle: "#1B2937",
    boxTitleBorder: "rgb(230, 190, 61)",
    boxShadow: "rgba(0,0,0,0.34)",
    boxHoverCss: "rgba(0, 0, 0, 0.055)",
    boxButtonHoverBackground: "#f7d05b",
    boxButtonHoverShadow: "#e4b727",
    boxButtonDisabledBackground: "#d3d2d3",
    boxButtonDisabledColor: "#565656",
    soonColor: "rgba(71, 71, 71, 0.404)",
    heroTag: "#273C50",
    heroTag3: "#A54916",
    leadMemberPosition: "rgba(234, 203, 93, 1)",
    leadMemberName: "#EFC317",
    leadMemberNameSpan: "rgba(161, 161, 161, 1)",
    leadMemberSkill: "#A3A3A3",
    leadMemberPoints: "rgba(134, 200, 91, 1)",
    leadMemberPointsName: "rgba(130, 130, 130, 1)",
    feedWrapperHover: "rgba(128, 128, 128, 0.205)",
    feedStatusWinner: "hsl(205, 86%, 65%)",
    feedStatusLoser: "hsl(6, 86%, 65%)",
    feedPlayerPictureBackground: "rgb(80, 80, 80)",
    feedPlayerDetailsSpan: "white",
    feedItem: "rgba(195, 195, 195, 1)",
    feedArrow: "rgba(195, 195, 195, 0.6)",
    alert: "#EED477",
    alertSpan: "rgba(119, 119, 119, 0.75)",
    languageSelectorButton: "rgba(0,0,0,0.6)",
    languageSelectorMenu: "#19191E",
    languageSelectorOptions: "rgba(0,0,0,0.9)",
    menuDesktop: "white",
    menuDesktopHover: "#39393F",
    menuMobileIcon: "white",
    footerWrapperBackground: "#1B2937",
    footerWrapperColor: "white",
    footerWrapperShadow: "rgba(63, 63, 63, 0.12)",
    leaderboardFilter: "rgba(0,0,0,0.1)",
    leaderboardMemberBody: "#273C50",
    profileOverviewStatsDiv: "rgba(128, 128, 128, 1)",
    profileFiltersWrapper: "rgb(65, 65, 65)",
    profileFiltersMenuShadow: "rgba(0,0,0,0.25)",
    profileFiltersMenuLabel: "#F3C249",
    sidebarFriendsNth: "#273C50",
    sidebarFriendsHover: "rgba(128, 128, 128, 0.205)",
    sidebarFriendsName: "white",
    sidebarFriendsStats: "white",
    sidebarPlayerDivider: "#273C50",
    sidebarPlayerTierDiv: "#F4C338",
    sidebarPlayerName: "#EFC317",
    sidebarPlayerUnderName: "white",
    sidebarPlayerTeamDetailsSpan: "white",
    sidebarRoles: "white",
    sidebarRolesKdaDeaths: "rgb(199, 0, 0)",
    sidebarRolesWr: "#808080",
    white: "#1B2937",
    black: "white",
    grey: "white",
    red: "red",
    blue: "blue",
    whitesmoke: "whitesmoke",
    transparent: "transparent"
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
