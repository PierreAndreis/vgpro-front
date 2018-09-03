import React, { Component } from "react";

import { Box } from "../../common/Box";
import styled from "styled-components";

const Wrap = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
`;

const Stat = styled.div`
  margin: 0.5vw 0;
  width: 100%;
  position: relative;
  font-size: 1.1vw;
  span {
    text-transform: uppercase;
    color: ${props => props.theme.text[400]};
    float: right;
  }
`;

const StatBarArea = styled.div`
  display: flex;
  & > span {
    width: 3.5vw;
    font-size: 1vw;
    text-align: right;
    line-height: 1.5vw;
  }
`;

const StatBar = styled.div`
  position: relative;
  flex: 1;
  height: 0.9vw;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 1vw;
  overflow: hidden;
  margin-top: 5px;

  &:after {
    content: "";
    display: block;
    width: ${props => `${props.value}%`};
    height: 100%;
    background: red;
    box-shadow: 0 0 30px 0px black;
    background-image: ${props => props.background};
    border-radius: 1vw;
  }
`;

export default class WidgetInfo extends Component {
  render() {
    return (
      <div>
        <h2>OVERALL STATS</h2>
        <Wrap>
          <Stat>
            <div>
              WIN RATE
              <span>943 Games 564 W - 379 L</span>
            </div>
            <StatBarArea>
              <StatBar
                value="40"
                background="linear-gradient(-90deg, #3023ae 0%, #d757a1 100%)"
              />
              <span>100.40%</span>
            </StatBarArea>
          </Stat>
          <Stat>
            <div>KILL PARTICIPATION</div>
            <StatBarArea>
              <StatBar
                value="10"
                background="linear-gradient(-90deg, #08AEEA 0%, #2AF5C7 100%)"
              />
              <span>59.81%</span>
            </StatBarArea>
          </Stat>
        </Wrap>
      </div>
    );
  }
}
