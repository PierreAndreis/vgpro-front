import React from "react";
import ErrorScreen from "../../common/ErrorScreen";

import { KDA } from "./../../common/ColoredValues";

import { SkeletonWrapper } from "../../common/Skeleton";

import { connect } from "react-redux";

import * as Styled from "./Overview.style";

class Overview extends React.Component {

  render() {
    const { player, status } = this.props;
    if (status === "error") return <ErrorScreen boxed width="100%" />;

    let stats;
    let winRate = 0;
    let kp = 0;

    if (status === "loaded") {
      stats = player.stats;
      winRate = stats.winRate;
      kp = stats.kp;
    }

    let games = (
      <SkeletonWrapper status={status} height={10} width={30} borderRadius={2} children={() => stats.games} />
    );
    let wins = (
      <SkeletonWrapper status={status} height={10} width={20} borderRadius={2} children={() => stats.wins} />
    );
    let loss = (
      <SkeletonWrapper status={status} height={10} width={20} borderRadius={2} children={() => stats.loss} />
    );

    let winPercent = (stats && stats.winRate) || "..";
    let kpPercent = (stats && stats.kp) || "..";

    return (
      <Styled.Wrap>

        <Styled.Group>
          <Styled.Title>Overall Stats</Styled.Title>
          <Styled.Content>

            <Styled.Bar>
              <Styled.Label>
                WIN RATE
                <span> </span>
                <span>{games} Games {wins} W - {loss} L</span>
              </Styled.Label>
              <Styled.Graph>
                <Styled.GraphBar type="win" percent={winRate}>
                  <div />
                </Styled.GraphBar>
                <span>
                  {winPercent}
                </span>
              </Styled.Graph>
            </Styled.Bar>

            <Styled.Bar>
              <Styled.Label>
                KILL PARTICIPATION
              </Styled.Label>
              <Styled.Graph>
                <Styled.GraphBar type="kpx" percent={kp}>
                  <div />
                </Styled.GraphBar>
                <span>
                  {kpPercent}
                </span>
              </Styled.Graph>
            </Styled.Bar>

          </Styled.Content>
        </Styled.Group>

        <Styled.Group>
          <Styled.Title>Overview Stats</Styled.Title>
          <Styled.Content>

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
                    <small>{Math.floor(stats.totalCS).toLocaleString()} Minions</small>
                  </React.Fragment>
                )}
              </SkeletonWrapper>
            </Styled.Stats>

            <Styled.Stats>
              <span>Kills</span>
              <SkeletonWrapper status={status} width={40} height={30}>
                {() => (
                  <React.Fragment>
                    <div>{stats.totalKills.toLocaleString()}</div>
                    <small>{Number(stats.totalKills / (stats.duration / 60)).toFixed(2)} per min</small>
                  </React.Fragment>
                )}
              </SkeletonWrapper>
            </Styled.Stats>

            <Styled.Stats>
              <span>Deaths</span>
              <SkeletonWrapper status={status} width={40} height={30}>
                {() => (
                  <React.Fragment>
                    <div>{stats.totalDeaths.toLocaleString()}</div>
                    <small>{Number(stats.totalDeaths / (stats.duration / 60)).toFixed(2)} per min</small>
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