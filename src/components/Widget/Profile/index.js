import React, { Component } from "react";
import { Trans } from "react-i18next";
import styled from "styled-components";
import { Box } from "./../../common/Box";
import { SkeletonContext } from "./../../common/Skeleton";
import ErrorScreen from "./../ErrorScreen";

import WidgetInfo from "./Info";
import WidgetPerfomance from "./Perfomance";
import WidgetHeroes from "./Heroes";
import WidgetRoles from "./Roles";
import WidgetMore from "./More";

import Utils from "../../../utils";
import API from "../../../utils/api";

const Content = styled.div`
  display: grid;
  grid-template:
    "box box stats" auto
    "box box stats" auto
    / 30% 30% 30%;

  flex-wrap: wrap;
  justify-content: center;
  position: relative;

  & > div {
    display: flex;
    flex-direction: column;
    margin: 0.3rem 0.3rem 0;
    box-sizing: border-box;
    & > h2 {
      font-size: 1.8vw;
      margin: 0.7vw 0;
      color: ${props => props.theme.primary[200]};
    }
    & ${Box} {
      background-color: #282c37;
      width: 100%;
      height: 11vw;
      margin: 0;
      padding: 1vw 1vw;
      box-sizing: border-box;
    }
  }
`;

export default class Profile extends Component {
  state = {
    status: "loading",
    payload: {},
  };

  componentDidMount() {
    Utils.makeCancelable(
      API.fetchPlayerStats(this.props.playerName),
      res => this.setState({ status: "loaded", payload: res })
    );
  }

  render() {
    const { status, payload } = this.state;

    const propsToPass = {
      payload: this.state.payload,
    };

    let FoundButNoMatch =
      status !== "loading" &&
      payload.stats &&
      payload.id &&
      !payload.name &&
      payload.stats.errors;

    if (FoundButNoMatch) {
      return (
        <ErrorScreen message={<Trans i18nKey="widget.playerInactive" />} />
      );
    }

    return (
      <SkeletonContext.Provider value={this.state.status}>
        <Content>
          <WidgetInfo {...propsToPass} />
          <WidgetHeroes {...propsToPass} />
          <WidgetRoles {...propsToPass} />
          <WidgetMore {...propsToPass} />
          <WidgetPerfomance {...propsToPass} />
        </Content>
      </SkeletonContext.Provider>
    );
  }
}
