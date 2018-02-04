import React from "react";

import ErrorScreen from "../../common/ErrorScreen";

import {KDA, Rate} from "../../common/ColoredValues";

import PieChart from "../../common/Charts/PieChart";
import "./RecentRoles.css";

import {Skeleton, SkeletonContainer, SkeletonPayload} from "../../common/Skeleton";

// const CARRY_COLOR   = "#9E2F31";
// const JUNGLE_COLOR  = "#9E2F31";
// const CAPTAIN_COLOR = "#9E2F31";

const Loading = () => (
   <div className="PlayerRole">
      <div className="PlayerRole-Image">
        <Skeleton width="65px" height="65px" borderRadius="50%" />
      </div>
      <div className="PlayerRole-Stats">
        <div className="PlayerRole-Stats-Value"><Skeleton width="80px" height="20px"/></div>

        <div className="PlayerRole-Stats-Desc">
          <Skeleton width="100px" height="25px"/>
        </div>
      </div>
      <div className="PlayerRole-WR">
        <div className="PlayerRole-WR-value"><Skeleton width="60px" height="20px"/></div>
        <div className="PlayerRole-WR-desc"><Skeleton width="90px" height="15px"/></div>
      </div>
    </div>
)


const Loaded = ({data}) => {

      // {
      //   "name": "Captain",
      //   "type": "role",
      //   "kda": 2.73,
      //   "games": 235,
      //   "wins": 110,
      //   "duration": 155701,
      //   "loss": 125,
      //   "winRate": "46.8%",
      //   "kp": "77.6%",
      //   "avgKills": 2.67,
      //   "totalKills": 627,
      //   "avgDeaths": 2.96,
      //   "totalDeaths": 696,
      //   "avgAssists": 5.42,
      //   "totalAssists": 1273,
      //   "avgCS": 22.6,
      //   "totalCS": 5309.900000000001,
      //   "blueGames": 99,
      //   "blueWins": 45,
      //   "blueWinRate": "45.5%",
      //   "redGames": 136,
      //   "redWins": 65,
      //   "redWinRate": "47.8%"
      // },

  const {
    name,
    kda,
    games,
    winRate,
    avgKills,
    avgDeaths,
    avgAssists,
  } = data;

  let lowerName = name.toLowerCase();

  let chartData = [
    { value: parseFloat(winRate), fill: `url(#${lowerName})`}
  ]

  return (
     <div className="PlayerRole">
      <div className="PlayerRole-Image">
        <PieChart data={chartData} width={80}>
          <div className={`PlayerRole-Icon ${lowerName}`}/>
        </PieChart>
      </div>
      <div className="PlayerRole-Stats">
        <div className="PlayerRole-Stats-Value"><KDA kda={kda} /> KDA</div>

        <div className="PlayerRole-Stats-Desc">
          <div className="PlayerRole-Stats_KDA Kill">{avgKills}</div>
          <div className="PlayerRole-Stats_KDA Death">{avgDeaths}</div>
          <div className="PlayerRole-Stats_KDA Assist">{avgAssists}</div>
        </div>
      </div>
      <div className="PlayerRole-WR">
        <div className="PlayerRole-WR-value"><Rate rate={winRate} /></div>
        <div className="PlayerRole-WR-desc">{games} played</div>
      </div>
    </div>
  )
}

const Role = SkeletonContainer(Loading, Loaded);

const RecentRoles = ({t, status, data}) => {

  let payload;
  let content = [];

  if (status === "loaded" && (data && data.stats && data.stats.Roles)) {

    let roles = data.stats.Roles;
    roles = roles.slice(0, 5);
    payload = roles;
  }
  else if (status === "loading") {
    payload = SkeletonPayload(3);
  }
  else {
    return <ErrorScreen />;
  }

  payload.forEach((role, index) => {
    content.push(<Role key={index} status={status} data={role} />);
  });

  return (
    <div className="PlayerRoles">
      {content}
    </div>
  )
}

export default RecentRoles;