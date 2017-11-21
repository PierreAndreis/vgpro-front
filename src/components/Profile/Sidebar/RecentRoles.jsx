import React from "react";
import PieChart from "../../common/Charts/PieChart";
import "./RecentRoles.css";

// const CARRY_COLOR   = "#9E2F31";
// const JUNGLE_COLOR  = "#9E2F31";
// const CAPTAIN_COLOR = "#9E2F31";

const winRate = {
  "carry": [{ value: 80, fill: 'url(#carry)' }],
  "jungle": [{value: 80, fill: 'url(#jungle)' }],
  "captain": [{value: 80, fill: 'url(#captain)' }]
};

const Role = ({name}) => (
   <div className="PlayerRole">
      <div className="PlayerRole-Image">
        <PieChart data={winRate[name]}>
          <div className={`PlayerRole-Icon ${name}`}/>
        </PieChart>
      </div>
      <div className="PlayerRole-Stats">
        <div className="PlayerRole-Stats-Value">2.84 KDA</div>

        <div className="PlayerRole-Stats-Desc">
          <div className="PlayerRole-Stats_KDA Kill">15</div>
          <div className="PlayerRole-Stats_KDA Death">25</div>
          <div className="PlayerRole-Stats_KDA Assist">30</div>
        </div>
      </div>
      <div className="PlayerRole-WR">
        <div className="PlayerRole-WR-value">32%</div>
        <div className="PlayerRole-WR-desc">10 played</div>
      </div>
    </div>
)

const RecentRoles = ({t}) => (
  <div className="PlayerRoles">
    <Role name="carry" />
    <Role name="jungle" />
    <Role name="captain" />
  </div>
)

export default RecentRoles;