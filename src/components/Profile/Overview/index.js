import React from "react";
import ErrorScreen from "../../common/ErrorScreen";

import HalfPieChart from "../../common/Charts/HalfPieChart";
import { Box, BoxBody } from "./../../common/Box";

import { KDA } from "./../../common/ColoredValues";

import { SkeletonWrapper } from "../../common/Skeleton";

import { connect } from "react-redux";

import * as Styled from "./Overview.style";

class Overview extends React.Component {

  render() {
    const { player, status } = this.props;
    if (status === "error") return <ErrorScreen boxed width="100%"/>;
    let stats;
    let winRateGraph;
    let kpGraph;
    let commonGraphProps;

    if (status === "loaded") {
      stats = player.stats;
      winRateGraph = [
        { value: parseFloat(stats.winRate), fill: 'url(#orange)' }
      ];
      kpGraph = [
        { value: parseFloat(stats.kp), fill: 'url(#orange)' }
      ];

      commonGraphProps = {
        width: 160,
      };
    }

    return (
      <Styled.Wrap>

        <Styled.Group>
          <Styled.Title>OverallStats</Styled.Title>
          <Styled.Content>

            <Styled.Chart>
              <SkeletonWrapper status={status} width={100} height={70} borderRadius={50}>
                {() => (
                  <HalfPieChart {...commonGraphProps} data={winRateGraph}>
                    {stats.winRate}
                  </HalfPieChart>
                )}
              </SkeletonWrapper>
              <Styled.ChartLabel>Win Rate</Styled.ChartLabel>
            </Styled.Chart>

            <Styled.Chart>
              <SkeletonWrapper status={status} width={100} height={70} borderRadius={50}>
                {() => (
                  <HalfPieChart {...commonGraphProps} data={kpGraph}>
                    {stats.kp}
                  </HalfPieChart>
                )}
              </SkeletonWrapper>
              <Styled.ChartLabel>K/P</Styled.ChartLabel>
            </Styled.Chart>

          </Styled.Content>
        </Styled.Group>

        <Styled.Group>
          <Styled.Title>Overview Stats</Styled.Title>
          <Styled.Content>

            <Styled.Stats>
              <span>Games</span>
              <SkeletonWrapper status={status} width={40} height={30}>
                {() => (
                  <React.Fragment>
                    <div>{stats.games}</div>
                    <small>{stats.wins} W - {stats.loss} L</small>
                  </React.Fragment>
                )}
              </SkeletonWrapper>
            </Styled.Stats>

            <Styled.Stats>
              <span>Avg. KDA</span>
              <SkeletonWrapper status={status} width={40} height={30}>
                {() => (
                  <React.Fragment>
                    <div><KDA kda={stats.kda} /></div>
                    <small>{stats.avgKills} / <b>{stats.avgDeaths}</b> / {stats.avgAssists}</small>
                  </React.Fragment>
                )}
              </SkeletonWrapper>
            </Styled.Stats>

            <Styled.Stats>
              <span>Avg. CS</span>
              <SkeletonWrapper status={status} width={40} height={30}>
                {() => (
                  <React.Fragment>
                    <div>{stats.avgCS}</div>
                    <small>{Math.floor(stats.totalCS)} Minions</small>
                  </React.Fragment>
                )}
              </SkeletonWrapper>
            </Styled.Stats>

            <Styled.Stats>
              <span>Kills</span>
              <SkeletonWrapper status={status} width={40} height={30}>
                {() => (
                  <React.Fragment>
                    <div>{stats.totalKills}</div>
                    <small>{Number(stats.totalKills/(stats.duration / 60)).toFixed(2)} per min</small>
                  </React.Fragment>
                )}
              </SkeletonWrapper>
            </Styled.Stats>

            <Styled.Stats>
              <span>Deaths</span>
              <SkeletonWrapper status={status} width={40} height={30}>
                {() => (
                  <React.Fragment>
                    <div>{stats.totalDeaths}</div>
                    <small>{Number(stats.totalDeaths/(stats.duration / 60)).toFixed(2)} per min</small>
                  </React.Fragment>
                )}
              </SkeletonWrapper>
            </Styled.Stats>

          </Styled.Content>
        </Styled.Group>

      </Styled.Wrap>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.playerStats
  }
}

export default connect(
  mapStateToProps
)(Overview);