import React, { Component } from "react";

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
  background: url("/images/logo_vertical.svg") no-repeat center;
  background-size: contain;
`;
export default class WidgetInfo extends Component {
  render() {
    return (
      <div>
        <h2>VIEW MORE</h2>
        <Wrap>
          <Logo />
        </Wrap>
      </div>
    );
  }
}
