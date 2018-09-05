import React, { Component } from "react";

import { Box } from "../../common/Box";
import styled from "styled-components";
import { SkeletonWrapper } from "../../common/Skeleton";
import Utils from "../../../utils";

const Wrap = styled(Box)``;

const Name = styled.div`
  display: flex;
  padding-bottom: 1vw;
  border-bottom: 0.1vw solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1vw;
  align-items: center;

  h3 {
    color: ${props => props.theme.primary[300]};
    font-family: ${props => props.theme.font.highlight};
    margin: 0;
    font-size: 2vw;
  }

  & span {
    font-size: 1.5vw;
    color: grey;
    margin-left: auto;
  }
`;

const Ranks = styled.div`
  display: flex;
  justify-content: space-around;

  .silver {
    color: silver;
  }
  .gold {
    color: gold;
  }
  .bronze {
    color: #cd7f32;
  }

  & > div {
    text-align: center;
    & > div {
      font-size: 2.5vw;
    }
  }

  & span {
    color: ${props => props.theme.text[100]};
    & > b {
      color: ${props => props.theme.text.solid};
      text-transform: uppercase;
    }
  }
`;
export default class WidgetInfo extends Component {
  render() {
    const payload = this.props.payload;
    const region = payload.region === "sg" ? "sea" : payload.region;

    let tier5v5 = "vg-question silver";
    let tier3v3 = "vg-question silver";

    let points5v5 = 0;
    let points3v3 = 0;
    let pointsBlitz = 0;

    if (payload) {
      const info5v5 = Utils.getSkillTier(
        Utils.getTier(payload.rank5v5Vst),
        true
      );
      const info3v3 = Utils.getSkillTier(
        Utils.getTier(payload.rankVst),
        true
      );

      points5v5 = Number(payload.rank5v5Vst).toFixed(0);
      points3v3 = Number(payload.rankVst).toFixed(0);
      pointsBlitz = Number(payload.blitzVst).toFixed(0);

      if (payload.rank5v5Vst > 1)
        tier5v5 = `vg-rank-${info5v5.tier} ${info5v5.color.toLowerCase()}`;
      if (payload.rankVst > 1) {
        tier3v3 = `vg-rank-${info3v3.tier} ${info3v3.color.toLowerCase()}`;
      }
    }

    return (
      <div>
        <h2>PROFILE</h2>
        <Wrap>
          <Name>
            <h3>
              <SkeletonWrapper width="15vw" height="2vw">
                {() => payload.name}
              </SkeletonWrapper>
            </h3>{" "}
            <span>
              <SkeletonWrapper width="4vw" height="2vw">
                {() => region.toUpperCase()}
              </SkeletonWrapper>
            </span>
          </Name>

          <Ranks>
            <div>
              <div className={tier5v5} />
              <span>
                <b>5v5</b>{" "}
                <SkeletonWrapper width="3vw" height="1.3vw">
                  {() => points5v5}
                </SkeletonWrapper>
              </span>
            </div>
            <div>
              <div className={tier3v3} />
              <span>
                <b>3v3</b>{" "}
                <SkeletonWrapper width="3vw" height="1.3vw">
                  {() => points3v3}
                </SkeletonWrapper>
              </span>
            </div>
            <div>
              <div className="vg-trophy" />
              <span>
                <b>Blitz</b>{" "}
                <SkeletonWrapper width="3vw" height="1.3vw">
                  {() => pointsBlitz}
                </SkeletonWrapper>
              </span>
            </div>
          </Ranks>
        </Wrap>
      </div>
    );
  }
}
