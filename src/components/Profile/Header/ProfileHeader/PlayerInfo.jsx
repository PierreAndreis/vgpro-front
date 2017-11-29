import React from "react";
import {Skeleton, SkeletonContainer} from "../../../common/Skeleton";

import "./PlayerInfo.css";


const regions = {
  "na": "North America",
  "eu": "Europe",
  "sg": "SouthEast Asia",
  "cn": "China",
  "sa": "South America",
}

const Loading = () => (
  <div className="Profile__Header-Info">

  <div className="Profile__Header-Name"><Skeleton width="150px" height="30px" /></div>
  <div className="Profile__Header-Region"><Skeleton width="90px" height="30px" /></div>
  
  <div className="Profile__Header-update">
    <Skeleton width="50px" height="20px" />
  </div>
</div>
)

const Loaded = ({t, status, data}) => {
  const {
    name,
    lastUpdated,
    region,
  } = data;

  return (
    <div className="Profile__Header-Info">

      <div className="Profile__Header-Name">{name}</div>
      <div className="Profile__Header-Region">{regions[region]}</div>
      
      <div className="Profile__Header-update">
        {t("last-update")}
        {" "}
        {lastUpdated}
      </div>
    </div>
  )
}

const PlayerInfo = SkeletonContainer(Loading, Loaded);

// {/* <div className="Profile__Desc">
//   <h3>{t("most-played-heroes")}</h3>
//   <div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}
//   <h3>{t("recent-results")}</h3>
//   <div className="match_result" id="d"></div>
//   <div className="match_result" id="v"></div>
// </div> */}

export default PlayerInfo;