import React from "react";
import { Trans } from "react-i18next";
import Spinner from "react-spinkit";
import styled from "styled-components";

import Match from "./Match";
import ErrorScreen from "../ErrorScreen";

import Utils from "../../../utils";
import API from "../../../utils/api";

const ViewMore = styled.h1`
  font-size: 1.7vw;
  color: ${props => props.theme.text.solid};
  text-align: center;
  b {
    color: ${props => props.theme.primary[300]};
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;

  flex-wrap: wrap;
  justify-content: center;
  position: relative;
`;

export default class WidgetMatches extends React.Component {
  state = {
    status: "loading",
    payload: [],
  };

  componentDidMount() {
    Utils.makeCancelable(
      API.fetchPlayerMatches(this.props.playerName, { limit: 4 }),
      res =>
        this.setState({
          status: "loaded",
          payload: res,
        })
    );
  }

  render() {
    if (this.state.status === "loading")
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "10vw",
          }}
        >
          <Spinner
            name="line-spin-fade-loader"
            color="rgba(255, 255, 255, 0.5)"
            fadeIn="none"
          />
        </div>
      );
    const payload = this.state.payload;

    if (this.state.payload < 1) {
      return (
        <ErrorScreen message={<Trans i18nKey="widget.playerInactive" />} />
      );
    }

    let link = "https://vgpro.gg/";

    return (
      <React.Fragment>
        <Content>
          {payload.map(match => (
            <Match key={match.id} payload={match} />
          ))}
        </Content>
        {/* <a href={link}> */}
        <ViewMore>
          <Trans i18nKey="widget.view_more_on_vgproogg">
            VIEW MORE ON VGPRO
            <b>.GG</b>
          </Trans>
        </ViewMore>
        {/* </a> */}
      </React.Fragment>
    );
  }
}
