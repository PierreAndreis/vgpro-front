import React from "react";

import {Skeleton, SkeletonContainer} from "../../../common/Skeleton";

import "./PlayerImg.css";


const Loading = () => {
  return (
    <div className="Profile__PlayerImg">

    <div className="Profile__PlayerImg-Tier">
      <Skeleton width="200px" height="170px" />
    </div>

  </div>
  )
}

const Loaded = ({data}) => {


  return (
    <div className="Profile__PlayerImg">

    <div className="Profile__PlayerImg-Tier">

      <div className="tier" style={{backgroundImage: `url(http://vgpro.gg/assets/images/skilltier/${parseInt(data.tier, 10) + 2}.png)`}} />
      
      {/* <div className="pro"  style={{backgroundImage: "url(http://vgpro.gg/assets/players_pics/DNZio.png)"}} /> */}

    </div>

  </div>
  )
}

const PlayerImg = SkeletonContainer(Loading, Loaded);

export default PlayerImg;