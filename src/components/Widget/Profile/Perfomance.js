import React, { Component } from "react";

import { translate, Trans } from "react-i18next";

import { Box } from "../../common/Box";
import styled from "styled-components";
import { SkeletonWrapper } from "../../common/Skeleton";

const Wrap = styled(Box)`
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  hr {
    width: 100%;
    border: 0;
    height: 0.1vw;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const Stat = styled.div`
  text-align: center;
  margin: 0 0.3vw;
  span {
    text-transform: uppercase;
    font-size: 1.3vw;
    color: ${props => props.theme.text[200]};
    font-family: ${props => props.theme.font.highlight};
  }
  div {
    font-weight: bold;
    font-size: 2vw;
  }
`;

const Stat2 = styled.div`
  margin: 0.5vw 0;
  margin-bottom: 1vw;
  width: 100%;
  position: relative;
  font-size: 1.5vw;
  & > div {
    display: flex;
    justify-content: space-between;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      font-size: 1.4vw;
      font-weight: 500;
      color: ${props => props.theme.text.solid};
      & > span {
        display: block;
        font-size: 1.3vw;
        color: ${props => props.theme.text[100]};
      }
    }
  }
  span {
    text-transform: uppercase;
    color: ${props => props.theme.text[400]};
    float: right;
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
    transition: all 500ms;
  }
`;

class WidgetPerfomance extends Component {
  render() {
    const { payload, t } = this.props;

    let wr = 0;
    let kp = 0;
    if (payload.stats) {
      wr = ((payload.stats.wins / payload.stats.games) * 100).toFixed(1);
      kp = payload.stats.kp.toFixed(1);
    }

    return (
      <div style={{ gridArea: "stats" }}>
        <h2>
          <Trans i18nKey="widget.performance" />
        </h2>
        <Wrap>
          <Stats>
            <Stat>
              <span>
                <Trans i18nKey="widget.kda">
                  <span /> KDA
                </Trans>
              </span>
              <div>
                <SkeletonWrapper width="4vw" height="2vw">
                  {() => payload.stats.kda}
                </SkeletonWrapper>
              </div>
            </Stat>
            <Stat>
              <span>
                <Trans i18nKey="widget.kills_label" />
              </span>
              <div>
                <SkeletonWrapper width="4vw" height="2vw">
                  {() => payload.stats.totalKills}
                </SkeletonWrapper>
              </div>
            </Stat>
            <Stat>
              <span>
                <Trans i18nKey="widget.deaths_label" />
              </span>
              <div>
                <SkeletonWrapper width="4vw" height="2vw">
                  {() => payload.stats.totalDeaths}
                </SkeletonWrapper>
              </div>
            </Stat>
            <Stat>
              <span>
                <Trans i18nKey="widget.assists_label" />
              </span>
              <div>
                <SkeletonWrapper width="4vw" height="2vw">
                  {() => payload.stats.totalAssists}
                </SkeletonWrapper>
              </div>
            </Stat>
          </Stats>
          <hr />
          <div>
            <Stat2>
              <div>
                <div>
                  <Trans i18nKey="widget.win_rate" />
                  <span>
                    <SkeletonWrapper width="1.2vw" height="0.8vw">
                      {() =>
                        t("widget.games", { games: payload.stats.games })
                      }
                    </SkeletonWrapper>{" "}
                    <SkeletonWrapper width="1vw" height="0.8vw">
                      {() => payload.stats.wins}
                    </SkeletonWrapper>{" "}
                    W -{" "}
                    <SkeletonWrapper width="1vw" height="0.8vw">
                      {() => payload.stats.games - payload.stats.wins}
                    </SkeletonWrapper>{" "}
                    L
                  </span>
                </div>
                <div>
                  <SkeletonWrapper width="3vw" height="2vw">
                    {() => wr + "%"}
                  </SkeletonWrapper>
                </div>
              </div>
              <StatBar
                value={wr}
                background="linear-gradient( 90deg, rgb(220,17,108) 0%, rgb(245,125,66) 100%)"
              />
            </Stat2>
            <Stat2>
              <div>
                <div>
                  <Trans i18nKey="widget.kill_participation" />
                </div>
                <div>
                  <SkeletonWrapper width="3vw" height="2vw">
                    {() => kp + "%"}
                  </SkeletonWrapper>
                </div>
              </div>
              <StatBar
                value={kp}
                background="linear-gradient( 90deg, rgb(223,17,182) 0%, rgb(48,119,179) 100%)"
              />
            </Stat2>
          </div>
        </Wrap>
      </div>
    );
  }
}

export default translate("widget")(WidgetPerfomance);
