import React from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";

import HalfPieChart from "./../common/Charts/PieChart";
import { SkeletonWrapper } from "./../common/Skeleton";
import { KDA } from "./../common/ColoredValues";
import { VPR } from "./../common/Ratings";

import Utils from "./../../utils";

import * as Styled from "./LeadMember.style";

class LeadMember extends React.PureComponent {
  render() {
    const { status, data, me } = this.props;

    const winRate = data.winRate ? parseFloat(data.winRate) : 0;

    const link = !data.name
      ? window.location
      : Utils.goToPlayer(data.name);

    let graph = [{ value: winRate, fill: "url(#orange)" }];

    let heroes = [];

    for (let i = 0; i < 5; i++) {
      const hero = data && data.topHeroes && data.topHeroes[i];
      heroes.push(<Styled.Hero key={i} type="heroes" name={hero} />);
    }

    return (
      <Styled.Wrapper
        hover
        animation="fadeIn"
        animationDelay={this.props.animationDelay}
      >
        <Link to={link}>
          <Styled.Body me={data && me === data.name}>
            <Styled.Position>
              <SkeletonWrapper status={status} width="15px" height="25px">
                {() => <span>{data.position}</span>}
              </SkeletonWrapper>
            </Styled.Position>

            <div>
              <SkeletonWrapper status={status} width="35px" height="0px">
                {() => (
                  <Styled.Tier
                    type="tiers"
                    name={Utils.getTier(data.points)}
                  />
                )}
              </SkeletonWrapper>

              <Styled.PlayerInfo>
                <Styled.PlayerName>
                  <SkeletonWrapper
                    status={status}
                    width={`${Math.floor(Math.random() * 60) + 40}px`}
                    height="15px"
                  >
                    {() => (
                      <div>
                        {data.name}{" "}
                        <span>
                          {data.region === "sg" ? "sea" : data.region}
                        </span>
                      </div>
                    )}
                  </SkeletonWrapper>
                </Styled.PlayerName>
                <span>
                  <SkeletonWrapper status={status} width="35px">
                    {() => (
                      <span>
                        <Trans i18nKey="terms.KDA" />{" "}
                        <KDA kda={data.kda} />
                      </span>
                    )}
                  </SkeletonWrapper>
                </span>
              </Styled.PlayerInfo>
            </div>

            <Styled.Points>
              <SkeletonWrapper status={status} width="55px">
                {() => (
                  <div>
                    <VPR value={data.points} />
                  </div>
                )}
              </SkeletonWrapper>
              <span>
                <Trans i18nKey="terms.Points" />
              </span>
            </Styled.Points>

            <Styled.GameInfo>
              <Styled.Chart>
                <SkeletonWrapper
                  status={status}
                  width="55px"
                  height="0"
                  borderRadius="50%"
                >
                  {() => (
                    <HalfPieChart width={55} data={graph}>
                      <span>{winRate}%</span>
                    </HalfPieChart>
                  )}
                </SkeletonWrapper>
              </Styled.Chart>
              <Styled.Rates>
                <div>
                  <Styled.RateLabel label="w">W</Styled.RateLabel>
                  <SkeletonWrapper
                    status={status}
                    width="25px"
                    height="10px"
                  >
                    {() => data.wins}
                  </SkeletonWrapper>
                </div>

                <div>
                  <Styled.RateLabel label="l">L</Styled.RateLabel>
                  <SkeletonWrapper
                    status={status}
                    width="25px"
                    height="10px"
                  >
                    {() => data.games - data.wins}
                  </SkeletonWrapper>
                </div>
              </Styled.Rates>
            </Styled.GameInfo>

            <Styled.Heroes>{heroes}</Styled.Heroes>
          </Styled.Body>
        </Link>
      </Styled.Wrapper>
    );
  }
}

export default LeadMember;
