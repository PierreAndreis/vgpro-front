/** this page has no footer or header */
import React, { Component } from "react";
import { Helmet } from "react-helmet";

import Spinner from "react-spinkit";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import ErrorScreen from "./ErrorScreen";
import Themes from "./../../themes";

import Profile from "./Profile";
import Matches from "./Matches";
import API from "../../utils/api";
import Utils from "../../utils";

injectGlobal`
  html {
      -webkit-text-size-adjust: none
  }
  body {
    background: #0f0f18;
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: ${props => props.theme.background.primary}; */
  background-color: #0f0f18;
  z-index: 9999;
  overflow: hidden;
  position: fixed;

  color: white;
  font-size: 1.5vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 3vw 0.2vw;

  & > section {
    flex: 1;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: url("/images/logo_bg.png") no-repeat;
  background-size: 50vw;
  opacity: ${props => props.theme.bgOpacity};
  background-position: center top;
  position: absolute;
  z-index: -1;
`;

const Selector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5vw;
  flex-shrink: 0;
  & > div {
    padding: 0.5vw 2vw;
    border: 0.2vw solid white;
    margin-left: -0.2vw;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 300ms;
    font-size: 1.6vw;
    &[data-active="true"] {
      background: white;
      color: ${props => props.theme.background.primary};
    }
    &:not([data-active="true"]):hover {
      background: rgba(255, 255, 255, 0.2);
    }

    &:first-of-type {
      border-radius: 1vw 0 0 1vw;
      margin-left: 0;
    }
    &:last-of-type {
      border-radius: 0 1vw 1vw 0;
    }
  }
`;

export default class Widget extends Component {
  state = {
    tab: "profile",
    status: "loading",
    playerName: null,
  };

  onChangeTab = newTab => e => {
    e.preventDefault();
    if (this.state.tab === newTab) return;
    this.setState({
      tab: newTab,
    });
  };

  async componentDidMount() {
    const playerId = this.props.match.params.playerId;

    Utils.makeCancelable(
      API.lookupPlayerId(playerId),
      res =>
        this.setState({
          status: "loaded",
          playerName: res.name,
        }),
      err =>
        this.setState({
          status: "error",
        })
    );
  }

  render() {
    const currentTab = this.state.tab;
    const playerName = this.state.playerName;
    const status = this.state.status;

    let content;

    if (status === "loading") {
      content = (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Spinner
            name="line-spin-fade-loader"
            color="rgba(255, 255, 255, 0.5)"
            fadeIn="none"
          />
        </div>
      );
    }

    if (status === "loaded") {
      if (!playerName) {
        content = <ErrorScreen message="Player not found" />;
      } else {
        content = (
          <React.Fragment>
            <Selector>
              <div
                data-active={currentTab === "profile"}
                onClick={this.onChangeTab("profile")}
              >
                Profile
              </div>

              <div
                data-active={currentTab === "matches"}
                onClick={this.onChangeTab("matches")}
              >
                Matches
              </div>
            </Selector>
            <section>
              {currentTab === "profile" && (
                <Profile playerName={playerName} />
              )}
              {currentTab === "matches" && (
                <Matches playerName={playerName} />
              )}
            </section>
          </React.Fragment>
        );
      }
    }

    return (
      <ThemeProvider theme={Themes[1]}>
        <Wrap>
          <Helmet>
            <meta
              name="viewport"
              content="width=device-width, user-scalable=no"
            />
            <meta name="HandheldFriendly" content="true" />
          </Helmet>
          <Background />
          {content}
        </Wrap>
      </ThemeProvider>
    );
  }
}
