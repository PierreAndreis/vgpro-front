import React from "react";

import {Link}   from "react-router-dom";


import HalfPieChart from "./../common/Charts/PieChart";
import {SkeletonWrapper} from "./../common/Skeleton";

import {KDA}       from "./../common/ColoredValues";
import {VPR}       from "./../common/Ratings";

import Utils from "./../../utils";
import AssetLoader from "./../common/AssetLoader";


import "./LeadMember.css";

const LeadMember = ({status, data}) => {

  const winRate = (data.winRate) ? parseFloat(data.winRate) : 0;

  const link = (!data.name) ? window.location : Utils.goToPlayer(data.name);

  let graph = [
      { value: winRate, fill: 'url(#orange)'}
  ]

  let heroes = [];

  for (let i = 0; i < 5; i++) {
    const hero = data && data.topHeroes && data.topHeroes[i];
    heroes.push(<AssetLoader key={i} type="heroes" name={hero} className="Leaderboard-Member-Hero" />)
  }

  return (
    <Link className="Leaderboard-Member" to={link}>

      <div className="Leaderboard-Member-Position">
        <SkeletonWrapper status={status} width="15px" height="25px">
          { () => <span>{data.position}</span>}
        </SkeletonWrapper>
      </div>

      <SkeletonWrapper status={status} width="35px" height="0px">
        {() => <AssetLoader type="tiers" name={data.tier} className="Leaderboard-Member-Tier" />}
      </SkeletonWrapper>

      <div className="Leaderboard-Member-Info">
        <div className="Leaderboard-Member-Name">
          <SkeletonWrapper status={status} width={`${Math.floor(Math.random() * 60) + 40}px`} height="20px">
            {() => data.name}
          </SkeletonWrapper>
        </div>
        <span>
          <SkeletonWrapper status={status} width="35px">
            {() => <span>KDA <KDA kda={data.kda}/></span>}
          </SkeletonWrapper>
        </span>
      </div>

      <div className="Leaderboard-Member-Score">
        <SkeletonWrapper status={status} width="55px">
          {() => <div><VPR value={data.points} /></div>}
        </SkeletonWrapper>
        <span>Points</span>
      </div>

      <div className="Leaderboard-Member-Stats">
        <div className="Leaderboard-Member-Chart">
        <SkeletonWrapper status={status} width="55px" height="0" borderRadius="50%">
          {() => (
            <HalfPieChart width={55} data={graph}>
              <span>{winRate}%</span>
            </HalfPieChart>
          )}
        </SkeletonWrapper>
        </div>
        <div className="Leaderboard-Member-Rates">

          <div>
            <span className="Rate-Win">W</span>
            <SkeletonWrapper status={status} width="25px" height="10px">
              {() => data.wins}
            </SkeletonWrapper>
          </div>

          <div>
            <span className="Rate-Loss">L</span>
            <SkeletonWrapper status={status} width="25px" height="10px">
              {() => data.games - data.wins}
            </SkeletonWrapper>
          </div>
        </div>

      </div>

      <div className="Leaderboard-Member-Heroes">
        {heroes}
      </div>

    </Link>
  );
}


export const LeaderHeader = () => (
    <div className="Leaderboard-Member Leaderboard-Header">

    <div className="Leaderboard-Member-Position"></div>
    <div className="Leaderboard-Member-Tier"></div>
    <div className="Leaderboard-Member-Info"></div>
    <div className="Leaderboard-Member-Score">Points</div>
    <div className="Leaderboard-Member-Stats">WinRate</div>
    <div className="Leaderboard-Member-Heroes">Top Picks</div>

  </div>
)

export default LeadMember;