import React from "react";
import { Trans } from "react-i18next";
import { AllStats } from "./../Overview/Stats";

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
    return (
      <Styled.Container>
        <Box.wrap>
          <Styled.Body>
            <h4>Win Rate</h4>
            <div>
              <Styled.Label>
                <div>30%</div>

                <span>Playing Against</span>
                <div>70%</div>
              </Styled.Label>
              <Styled.Bar>
                <div style={{ width: "30%" }} />
                <div style={{ width: "70%" }} />
              </Styled.Bar>
            </div>

            <div>
              <Styled.Label>
                <div>30%</div>

                <span>Playing With</span>
                <div>70%</div>
              </Styled.Label>
              <Styled.Bar>
                <div style={{ width: "30%" }} />
                <div style={{ width: "70%" }} />
              </Styled.Bar>
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
