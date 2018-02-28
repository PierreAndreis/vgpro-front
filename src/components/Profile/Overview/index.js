import React from "react";
import ErrorScreen from "../../common/ErrorScreen";

import HalfPieChart from "../../common/Charts/HalfPieChart";

import { KDA } from "./../../common/ColoredValues";

import { SkeletonWrapper } from "../../common/Skeleton";

import { connect } from "react-redux";

import * as Styled from "./Overview.style";
import Utils from "../../../utils";

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
          <Styled.Title>Overall Stats</Styled.Title>
          <Styled.Content>

            <Styled.Chart>
              <SkeletonWrapper status={status} width={100} height={70} borderRadius={50}>
                {() => (
                    <React.Fragment>
                        <Styled.ChartLabel>Win Rate <span>{stats.games} Games {stats.wins} W - {stats.loss} L</span></Styled.ChartLabel>
                        <Styled.PlayerStats>
                            <Styled.PlayerGraph>
                                <Styled.PlayerGraphBar type="winRate" percent={stats.winRate}>
                                    <div />
                                </Styled.PlayerGraphBar>
                                <span> {stats.winRate} </span>
                            </Styled.PlayerGraph>

                        </Styled.PlayerStats>
                    </React.Fragment>
                )}
              </SkeletonWrapper>

            </Styled.Chart>

              <Styled.Chart>
                  <SkeletonWrapper status={status} width={100} height={70} borderRadius={50}>
                      {() => (
                          <React.Fragment>

                              <Styled.PlayerStats>
                                  <Styled.ChartLabel>K/P</Styled.ChartLabel>
                                  <Styled.PlayerGraph>

                                      <Styled.PlayerGraphBar type="kp" percent={stats.kp}>
                                          <div />
                                      </Styled.PlayerGraphBar>
                                      <span> {stats.kp} </span>
                                  </Styled.PlayerGraph>

                              </Styled.PlayerStats>
                          </React.Fragment>
                      )}
                  </SkeletonWrapper>
              </Styled.Chart>

              <Styled.Chart>
                  <Styled.ChartLabel>Whatever</Styled.ChartLabel>

                <SkeletonWrapper status={status} width={100} height={70} borderRadius={50}>
                      {() => (

                          <React.Fragment>

                              <Styled.PlayerStats>

                                  <Styled.PlayerGraph>
                                      <Styled.PlayerGraphBar percent={stats.winRate}>
                                          <div />
                                      </Styled.PlayerGraphBar>
                                      <span> {stats.winRate} </span>
                                  </Styled.PlayerGraph>

                              </Styled.PlayerStats>
                          </React.Fragment>
                      )}
                  </SkeletonWrapper>

              </Styled.Chart>

            {/*<Styled.Chart>*/}
              {/*<SkeletonWrapper status={status} width={100} height={70} borderRadius={50}>*/}
                {/*{() => (*/}
                    {/*<React.Fragment>*/}

                        {/*<Styled.PlayerStats>*/}

                            {/*<Styled.PlayerGraph>*/}
                                {/*<Styled.PlayerGraphBar percent={stats.kp}>*/}
                                    {/*<div />*/}
                                {/*</Styled.PlayerGraphBar>*/}
                                {/*<span>{stats.kp}</span>*/}
                            {/*</Styled.PlayerGraph>*/}

                            {/*<Styled.PlayerGraph>*/}
                                {/*<Styled.PlayerGraphBar percent={stats.kp}>*/}
                                    {/*<div />*/}
                                {/*</Styled.PlayerGraphBar>*/}
                                {/*<span>{stats.kp}</span>*/}
                            {/*</Styled.PlayerGraph>*/}

                            {/*<Styled.PlayerGraph>*/}
                                {/*<Styled.PlayerGraphBar percent={stats.kp}>*/}
                                    {/*<div />*/}
                                {/*</Styled.PlayerGraphBar>*/}
                                {/*<span>{stats.kp}</span>*/}
                            {/*</Styled.PlayerGraph>*/}

                            {/*<Styled.PlayerGraph>*/}
                                {/*<Styled.PlayerGraphBar percent={stats.kp}>*/}
                                    {/*<div />*/}
                                {/*</Styled.PlayerGraphBar>*/}
                                {/*<span>{stats.kp}</span>*/}
                            {/*</Styled.PlayerGraph>*/}

                        {/*</Styled.PlayerStats>*/}
                    {/*</React.Fragment>*/}
                {/*)}*/}
              {/*</SkeletonWrapper>*/}
              {/*<Styled.ChartLabel>K/P</Styled.ChartLabel>*/}
            {/*</Styled.Chart>*/}

              {/*<Styled.Chart>*/}
                  {/*<SkeletonWrapper status={status} width={100} height={70} borderRadius={50}>*/}
                      {/*{() => (*/}
                          {/*<React.Fragment>*/}

                              {/*<Styled.PlayerStats>*/}

                                  {/*<Styled.PlayerGraph>*/}
                                      {/*<Styled.PlayerGraphBar percent={stats.kp}>*/}
                                          {/*<div />*/}
                                      {/*</Styled.PlayerGraphBar>*/}
                                      {/*<span>{stats.kp}</span>*/}
                                  {/*</Styled.PlayerGraph>*/}

                                  {/*<Styled.PlayerGraph>*/}
                                      {/*<Styled.PlayerGraphBar percent={stats.kp}>*/}
                                          {/*<div />*/}
                                      {/*</Styled.PlayerGraphBar>*/}
                                      {/*<span>{stats.kp}</span>*/}
                                  {/*</Styled.PlayerGraph>*/}

                                  {/*<Styled.PlayerGraph>*/}
                                      {/*<Styled.PlayerGraphBar percent={stats.kp}>*/}
                                          {/*<div />*/}
                                      {/*</Styled.PlayerGraphBar>*/}
                                      {/*<span>{stats.kp}</span>*/}
                                  {/*</Styled.PlayerGraph>*/}

                                  {/*<Styled.PlayerGraph>*/}
                                      {/*<Styled.PlayerGraphBar percent={stats.kp}>*/}
                                          {/*<div />*/}
                                      {/*</Styled.PlayerGraphBar>*/}
                                      {/*<span>{stats.kp}</span>*/}
                                  {/*</Styled.PlayerGraph>*/}

                              {/*</Styled.PlayerStats>*/}
                          {/*</React.Fragment>*/}
                      {/*)}*/}
                  {/*</SkeletonWrapper>*/}
                  {/*<Styled.ChartLabel>K/P</Styled.ChartLabel>*/}
              {/*</Styled.Chart>*/}

          </Styled.Content>
        </Styled.Group>

        <Styled.Group>
            <Styled.Title>Average Stats

                {/*<SkeletonWrapper status={status}>*/}
                    {/*{() => (*/}
                        {/*<React.Fragment>Stats of {stats.games} Games: {stats.wins} W - {stats.loss} L</React.Fragment>*/}
                    {/*)}*/}
                {/*</SkeletonWrapper>*/}
                </Styled.Title>
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
                    <div>{stats.totalDeaths.toLocaleString()}</div>
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

/* {/*<React.Fragment>*/
/*<Styled.PlayerStats>*/
/*<Styled.PlayerGraph>*/
/*<Styled.PlayerGraphBar type="done" percent={kpGraph}>*/
/*<div />*/
/*</Styled.PlayerGraphBar>*/
/*</Styled.PlayerGraph>*/
/*</Styled.PlayerStats>*/
/*</React.Fragment>*/
// <HalfPieChart {...commonGraphProps} data={kpGraph}>
//   {stats.kp}
// </HalfPieChart>