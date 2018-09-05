import React, { Component } from "react";

import { Trans } from "react-i18next";

import { Box } from "../../common/Box";
import styled from "styled-components";

const Wrap = styled(Box)`
  height: 100%;
  background: linear-gradient(
    -90deg,
    rgb(239, 96, 72) 0%,
    rgb(248, 204, 106) 100%
  );
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  width: 10vw;
  height: 7vw;
  background: url("/images/logo_vertical@2x.png") no-repeat center;
  background-size: contain;
`;
export default class WidgetInfo extends Component {
  render() {
    let link = "https://vgpro.gg/";

    if (this.props.payload && this.props.payload.name) {
      link += `players/${this.props.payload.name}`;
    }

    return (
      <div>
        <h2>
          <Trans i18nKey="widget.view_more" />
        </h2>
        <a href={link}>
          <Wrap>
            <Logo />
          </Wrap>
        </a>
      </div>
    );
  }
}
