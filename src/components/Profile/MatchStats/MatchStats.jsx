import React from "react";
import HalfPieChart from "../../common/Charts/HalfPieChart";
import {Box, BoxBody} from "./../../common/Box";
import "./MatchStats.css"

import {Skeleton, SkeletonContainer} from "../../common/Skeleton";

import { connect }          from "react-redux";

const BlueColor = "#288FCB";
const RedColor = "#EC5B56";

class Loading extends React.Component {

  render() {
    return (
      <div className="ProfileMatchStats">
        <div className="ProfileMatchStats-Wrap">

          <div className="ProfileMatchStats-Box">

            <Box className="ProfileMatchStats-Stats">
              <BoxBody className="ProfileStats"> 
                <div className="ProfileStats__Category">
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart">
                      <Skeleton width="80px" height="80px" borderRadius="50%" />
                    </div>
                    <div className="ProfileStats__Stats-Label chart"><Skeleton width="50px" /></div>
                  </div> 
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart">
                      <Skeleton width="80px" height="80px" borderRadius="50%" />
                    </div>
                    <div className="ProfileStats__Stats-Label chart"><Skeleton width="50px" /></div>
                  </div> 
                </div>
                <div className="ProfileStats__Stats">
                  <div className="ProfileStats__Stats-Value"><Skeleton width="50px" /></div>
                  <Skeleton width="150px" height="10px" />

                  <div className="ProfileStats__Stats-Desc">
                    <div className="ProfileStats__KDA Kill"><Skeleton width="10px" /></div>
                    <div className="ProfileStats__KDA Death"><Skeleton width="10px" /></div>
                    <div className="ProfileStats__KDA Assist"><Skeleton width="10px" /></div>
                  </div>
                  <div className="ProfileStats__Stats-Label"><Skeleton width="50px" /></div>
                </div>
                <div className="ProfileStats__Category">
                  <h4><Skeleton width="50px" /></h4>
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart">
                      <Skeleton width="80px" height="80px" borderRadius="50%" />
                    </div>
                    <div className="ProfileStats__Stats-Label chart" 
                    style={{color: BlueColor}}>
                      <Skeleton width="50px" />
                    </div>
                  </div> 
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart">
                      <Skeleton width="80px" height="80px" borderRadius="50%" />
                    </div>
                    <div className="ProfileStats__Stats-Label chart" 
                        style={{color: RedColor}}>
                        <Skeleton width="50px" />
                      </div>
                  </div>

                </div>
              </BoxBody>
            </Box>
          </div>

          <div>
            <div className="ProfileMatchStats-Filters">

            </div>
          </div>

        </div>
      </div>
    )
  }
}

class Loaded extends React.Component {

  render() {
    const {playerStats} = this.props;

    const {
      winRate,
      kda,
      totalKills,
      totalDeaths,
      totalAssists,
      avgKills,
      avgDeaths,
      avgAssists,
      kp,
      blueWinRate,
      redWinRate,
    } = playerStats.stats;

    const total = totalKills + totalAssists + totalDeaths;

    const killsPercent = (totalKills / total) * 100;
    const deathsPercent = (totalDeaths / total) * 100;
    const assistsPercent = (totalAssists / total) * 100;

    const winRateGraph = [
      { value: parseFloat(winRate), fill: 'url(#orange)' }
    ];
    const kpGraph = [
      { value: parseFloat(kp), fill: 'url(#orange)' }
    ];
    const blueGraph = [
      { value: parseFloat(blueWinRate), fill: 'url(#blue)' }
    ];
    const redGraph = [
      { value: parseFloat(redWinRate), fill: 'url(#red)' }
    ]


    return (
      <div className="ProfileMatchStats">
        <div className="ProfileMatchStats-Wrap">

          <div className="ProfileMatchStats-Box">

            <Box className="ProfileMatchStats-Stats">
              <BoxBody className="ProfileStats"> 
                <div className="ProfileStats__Category">
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart">
                      <HalfPieChart data={winRateGraph} label={winRate} />
                    </div>
                    <div className="ProfileStats__Stats-Label chart">Win Rate</div>
                  </div> 
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart"><HalfPieChart data={kpGraph} label={kp} /></div>
                    <div className="ProfileStats__Stats-Label chart">K/P</div>
                  </div> 
                </div>
                <div className="ProfileStats__Stats">
                  <div className="ProfileStats__Stats-Value">{kda}</div>
                  <div className="ProfileStats__Stats-Bar">
                    <div className="fill" style={{width: `${killsPercent}%`, backgroundColor: "#9E2F31"}} />
                    <div className="fill" style={{width: `${deathsPercent}%`, backgroundColor: "#6CB525"}}  />
                    <div className="fill" style={{width: `${assistsPercent}%`, backgroundColor: "#BE9521"}}  />
                  </div>

                  <div className="ProfileStats__Stats-Desc">
                    <div className="ProfileStats__KDA Kill">{avgKills}</div>
                    <div className="ProfileStats__KDA Death">{avgDeaths}</div>
                    <div className="ProfileStats__KDA Assist">{avgAssists}</div>
                  </div>
                  <div className="ProfileStats__Stats-Label">KDA</div>
                </div>
                <div className="ProfileStats__Category">
                  <h4>Sides W/R</h4>
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart"><HalfPieChart data={blueGraph} label={blueWinRate} /></div>
                    <div className="ProfileStats__Stats-Label chart" style={{color: BlueColor}}>Blue</div>
                  </div> 
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart"><HalfPieChart data={redGraph} label={redWinRate}/></div>
                    <div className="ProfileStats__Stats-Label chart" style={{color: RedColor}}>Red</div>
                  </div>

                </div>
              </BoxBody>
            </Box>
          </div>

          <div>
            <div className="ProfileMatchStats-Filters">

            </div>
          </div>

        </div>
      </div>
    )
  }
}

let SubHeader = SkeletonContainer(Loading, Loaded);

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

export default connect(
  mapStateToProps
)(SubHeader);