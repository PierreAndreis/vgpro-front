import React from "react";
import HalfPieChart from "../../common/Charts/HalfPieChart";
import {Box, BoxBody} from "./../../common/Box";
import "./MatchStats.css"

const winRate = [
  { value: 80, fill: '#288FCB' }
];

const KP = [
  { value: 20, fill: 'rgb(100,100,100)' }
];

const BlueColor = "#288FCB";
const RedColor = "#EC5B56";

const Blue = [
  { value: 45, fill: BlueColor },
];

const Red = [
  { value: 55, fill: RedColor }
]

class SubHeader extends React.Component {

  render() {
    // const {t} = this.props;
    return (
      <div className="ProfileMatchStats">
        <div className="ProfileMatchStats-Wrap">

          <div className="ProfileMatchStats-Box">

            <Box className="ProfileMatchStats-Stats">
              <BoxBody className="ProfileStats"> 
                <div className="ProfileStats__Category">
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart"><HalfPieChart data={winRate} label="80%" /></div>
                    <div className="ProfileStats__Stats-Label chart">Win Rate</div>
                  </div> 
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart"><HalfPieChart data={KP} label="20%" /></div>
                    <div className="ProfileStats__Stats-Label chart">K/P</div>
                  </div> 
                </div>
                <div className="ProfileStats__Stats">
                  <div className="ProfileStats__Stats-Value">2.84</div>
                  <div className="ProfileStats__Stats-Bar">
                    <div className="fill" style={{width: "14%", backgroundColor: "#9E2F31"}} />
                    <div className="fill" style={{width: "33%", backgroundColor: "#6CB525"}}  />
                    <div className="fill" style={{width: "45%", backgroundColor: "#BE9521"}}  />
                  </div>

                  <div className="ProfileStats__Stats-Desc">
                    <div className="ProfileStats__KDA Kill">15</div>
                    <div className="ProfileStats__KDA Death">25</div>
                    <div className="ProfileStats__KDA Assist">30</div>
                  </div>
                  <div className="ProfileStats__Stats-Label">KDA</div>
                </div>
                <div className="ProfileStats__Category">
                  <h4>Sides W/R</h4>
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart"><HalfPieChart data={Blue} label="20%" /></div>
                    <div className="ProfileStats__Stats-Label chart" style={{color: BlueColor}}>Blue</div>
                  </div> 
                  <div className="ProfileStats__Stats">
                    <div className="ProfileStats__Stats-Chart"><HalfPieChart data={Red} label="20%" /></div>
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

export default SubHeader;