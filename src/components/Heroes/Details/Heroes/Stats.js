import React from "react";
import { Trans } from "react-i18next";
import { AllStats } from "./../Overview/Stats";

import { Rate } from "../../../common/ColoredValues";
import { SkeletonWrapper } from "../../../common/Skeleton";
import Box from "../../../common/Box";

import * as Styled from "./Stats.style";

export class Stats extends React.Component {
  getPropertyAndFormat = (obj, property) => {
    let res = obj.stats.find(l => l.name === property);

    if (res && res.stats) {
      return res.stats;
    }

    return 0;
  };

  renderStats = stat => {
    let payload1 = this.props.stats[0];
    let payload2 = this.props.stats[1];

    let status = "loading";

    let value1 = this.getPropertyAndFormat(payload1, stat.property);
    let value2 = 0;

    if (payload2) {
      status = "loaded";
      value2 = this.getPropertyAndFormat(payload2, stat.property);
    }

    let percent1 = (value1 / (value1 + value2)) * 100 + "%";
    let percent2 = (value2 / (value1 + value2)) * 100 + "%";

    return (
      <div key={stat.property}>
        <Styled.Label>
          <div>
            {status === "loaded" && value1 > value2 ? (
              <b>{value1.toLocaleString()}</b>
            ) : (
              value1.toLocaleString()
            )}
          </div>
          <div>
            <SkeletonWrapper status={status} width={35} height={10}>
              {() =>
                value2 > value1 ? (
                  <b>{value2.toLocaleString()}</b>
                ) : (
                  value2.toLocaleString()
                )
              }
            </SkeletonWrapper>
          </div>

          <span>
            <Trans i18nKey={stat.label} />
          </span>
        </Styled.Label>
        <Styled.Bar>
          <div style={{ width: percent1 }} />
          <div style={{ width: percent2 }} />
        </Styled.Bar>
      </div>
    );
  };

  render() {
    let playingAgainstRate = this.props.stats[0].playingAgainst.find(
      hero => hero.key === this.props.name[1]
    );

    let playingWithRate = this.props.stats[0].playingWith.find(
      hero => hero.key === this.props.name[1]
    );

    if (!playingAgainstRate) {
      playingAgainstRate = {};
    }
    if (!playingWithRate) {
      playingWithRate = {};
    }

    return (
      <Styled.Container>
        <Box.wrap>
          <Styled.Body>
            <h4>
              {this.props.name[0]} <Trans i18nKey="terms.winrate" />
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Styled.Value>
                <span>
                  <Rate rate={playingAgainstRate.winRate} />
                </span>
                <div>
                  <Trans i18nKey="heroes.playingAgainst" /> <br />
                  {this.props.name[1]}
                </div>
              </Styled.Value>
              <Styled.Value>
                <span>
                  <Rate rate={playingWithRate.winRate} />
                </span>
                <div>
                  <Trans i18nKey="heroes.playingWith" /> <br />
                  {this.props.name[1]}
                </div>
              </Styled.Value>
            </div>

            <h4>
              <Trans i18nKey="terms.AverageStats" />
            </h4>

            {AllStats.map(this.renderStats)}
          </Styled.Body>
        </Box.wrap>
      </Styled.Container>
    );
  }
}

export default Stats;
