import React from "react";
// import GaugeChart from "../../common/Charts/GaugeChart";
import HalfPieChart from "../../common/Charts/HalfPieChart";

import {Box, BoxTitle, BoxBody} from "./../../common/Box";
import "./MatchStats.css"

const winRate = [
  { value: 80, fill: '#288FCB' }
];

const sideRate = [
  { value: 45, fill: '#EC5B56' },
  { value: 55, fill: '#288FCB' }
];

class SubHeader extends React.Component {

  render() {
    // const {t} = this.props;
    return (
      <div className="Profile__SubHeader">
        <div className="Profile__SubHeader-Wrap">

          <div className="Profile__SubHeader-Box">
            {/* <Box className="Profile__SubHeader-Team">
              <BoxBody className="ProfileTeam">
                <div className="ProfileTeam__SkillTier" style={{backgroundImage: "url(http://vgpro.gg/assets/images/skilltier/31.png)"}}>
                </div>
                <div className="ProfileTeam__Team">
                  <div className="ProfileTeam__Team-Logo" style={{backgroundImage: "url(/teams/C9.png)"}} />
                  <h1 className="ProfileTeam__Team-Name">Cloud9</h1>
                  <div className="ProfileTeam_Team-Desc">Carry | American</div>
                </div>
              </BoxBody>
            </Box> */}

            <Box className="Profile__SubHeader-Stats">
              <BoxBody className="ProfileStats"> 
                <div className="ProfileStats__Stats">
                  <div className="ProfileStats__Stats-Chart"><HalfPieChart data={winRate} label="80%" /></div>
                  <div className="ProfileStats__Stats-Label">Win Rate</div>
                </div> 
                <div className="ProfileStats__Stats">
                  <HalfPieChart data={sideRate} label="" />
                </div>
              </BoxBody>
            </Box>
          </div>

          <div>
            <div className="Profile__SubHeader-Filters">

            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default SubHeader;