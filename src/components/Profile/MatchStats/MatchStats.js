import React from "react";
import ErrorScreen from "../../common/ErrorScreen";

import HalfPieChart from "../../common/Charts/HalfPieChart";
import {Box, BoxBody} from "./../../common/Box";
import "./MatchStats.css"

import {KDA} from "./../../common/ColoredValues";

import {Skeleton, SkeletonContainer} from "../../common/Skeleton";

import { connect }          from "react-redux";

const BlueColor = "#288FCB";
const RedColor = "#EC5B56";

class Loading extends React.Component {

  render() {
    return (
      <Box className="ProfileMatchStats-Stats">
        <BoxBody className="ProfileStats"> 

          <div className="ProfileStats__Category">
            <div className="ProfileStats__Stats">
              <div className="ProfileStats__Stats-Chart">
                <Skeleton width="100px" height="100px" borderRadius="50%"/>
              </div>
              <div className="ProfileStats__Stats-Label chart">Win Rate</div>
            </div> 
            <div className="ProfileStats__Stats">
              <div className="ProfileStats__Stats-Chart">
                <Skeleton width="100px" height="100px" borderRadius="50%"/>
              </div>
              <div className="ProfileStats__Stats-Label chart">K/P</div>
            </div> 
          </div>

          <div className="ProfileStats__Category ProfileStats__Category-KDA">
            <div className="ProfileStats__Stats">
              <div className="ProfileStats__Stats-Value"><Skeleton width="100px" height="50px" /></div>
              <div className="ProfileStats__Stats-Label">KDA</div>
              <div className="ProfileStats__Stats-Desc">
                <div className="ProfileStats__KDA Kill"><Skeleton width="10px" height="10px" /></div>
                <div className="ProfileStats__KDA Death"><Skeleton width="10px" height="10px"/></div>
                <div className="ProfileStats__KDA Assist"><Skeleton width="10px" height="10px" /></div>
              </div>
            </div>
          </div>


          <div className="ProfileStats__Category">
            <div className="ProfileStats__Stats">
              <div className="ProfileStats__Stats-Chart">
                <Skeleton width="100px" height="100px" borderRadius="50%"/>
              </div>
              <div className="ProfileStats__Stats-Label chart" style={{color: BlueColor}}>Blue</div>
            </div> 
            <div className="ProfileStats__Stats">
              <div className="ProfileStats__Stats-Chart">
                <Skeleton width="100px" height="100px" borderRadius="50%"/>
              </div>
              <div className="ProfileStats__Stats-Label chart" style={{color: RedColor}}>Red</div>
            </div>

          </div>
        </BoxBody>
      </Box>
    )
  }
}

class Loaded extends React.Component {

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  resize = () => {
    this.forceUpdate();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  render() {
    const {player, status} = this.props;
    if (status === "error") return <ErrorScreen boxed width="100%" message={player} />

    const {
      winRate,
      kda,
      wins,
      games,
      avgKills,
      avgDeaths,
      avgAssists,
      kp,
      blueWinRate,
      redWinRate,
    } = player.stats;

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
    ];

    let commonGraphProps = {
    width: 170,
    };

    if (document.documentElement.clientWidth < 1311) {
      commonGraphProps["width"] = 150;
    }

    if (document.documentElement.clientWidth < 880) {
      commonGraphProps["width"] = 120;
    }

    return (
      <Box className="ProfileMatchStats-Stats">
        <BoxBody className="ProfileStats"> 
          <div className="ProfileStats__Category">
            <h4>Overall</h4>
            <div className="ProfileStats__Stats">
              <div className="ProfileStats__Stats-Chart">
                <HalfPieChart {...commonGraphProps} data={winRateGraph}>
                  {winRate} <br />
                  <div className="ProfileStats_Chart-UnderLabel">
                    {wins} W / {games - wins} L <br />
                    {games} total
                  </div>
                  
                </HalfPieChart>
              </div>
              <div className="ProfileStats__Stats-Label chart">Win Rate</div>
            </div> 
            <div className="ProfileStats__Stats">
              <div className="ProfileStats__Stats-Chart">
                <HalfPieChart {...commonGraphProps} data={kpGraph}>
                  {/* <Rate rate={kp} /> */}
                  {kp}
                </HalfPieChart>
              </div>
              <div className="ProfileStats__Stats-Label chart">K/P</div>
            </div> 
          </div>
          <div className="ProfileStats__Category ProfileStats__Category-KDA">
            <div className="ProfileStats__Stats">
              <div className="ProfileStats__Stats-Value"><KDA kda={kda || 0} /></div>
              <div className="ProfileStats__Stats-Label">KDA</div>

              <div className="ProfileStats__Stats-Desc">
                <div className="ProfileStats__KDA Kill">{avgKills}</div>
                <div className="ProfileStats__KDA Death">{avgDeaths}</div>
                <div className="ProfileStats__KDA Assist">{avgAssists}</div>
              </div>
            </div>
          </div>
          <div className="ProfileStats__Category">
            <h4>Sides W/R</h4>
            <div className="ProfileStats__Stats">
              <div className="ProfileStats__Stats-Chart">
                <HalfPieChart {...commonGraphProps} data={blueGraph}>
                  {/* <Rate rate={blueWinRate} /> */}
                  {blueWinRate}
                </HalfPieChart>
              </div>
              <div className="ProfileStats__Stats-Label chart" style={{color: BlueColor}}>Blue</div>
            </div> 
            <div className="ProfileStats__Stats">
              <div className="ProfileStats__Stats-Chart">
                <HalfPieChart {...commonGraphProps} data={redGraph}>
                  {/* <Rate rate={redWinRate} /> */}
                  {redWinRate}
                </HalfPieChart>
              </div>
              <div className="ProfileStats__Stats-Label chart" style={{color: RedColor}}>Red</div>
            </div>

          </div>
        </BoxBody>
      </Box>
    )
  }
}

let SubHeader = SkeletonContainer(Loading, Loaded);

const mapStateToProps = state => {
  return {
    ...state.playerStats
  }
}

export default connect(
  mapStateToProps
)(SubHeader);