import React from "react";

import {Skeleton, SkeletonContainer} from "../../../common/Skeleton";

import "./PlayerVPR.css";

const Loading = () => {
  return (
    <div className="Profile__Header-VPR">

      <div className="Profile__VPR-Stat VPR">
        <div><Skeleton width="100px" height="25px"/></div>
        <span><Skeleton width="40px" height="10px"/></span>
      </div>

      <div className="Profile__VPR-desc mobile">
        <Skeleton width="100px" height="25px"/>
      </div>

      <div className="Profile__VPR-Stat">
        <div><Skeleton width="100px" height="25px"/></div>
        <span><Skeleton width="40px" height="10px"/></span>
      </div>

      <div className="Profile__VPR-Stat">
        <div><Skeleton width="100px" height="25px"/></div>
        <span><Skeleton width="40px" height="10px"/></span>
      </div>
    </div>
  )
}

const Loaded = ({t}) => {
  return (
    <div className="Profile__Header-VPR">

      <div className="Profile__VPR-Stat VPR">
        <div>2,381</div>
        <span>VGPRO RATING <br /> VPR </span>
      </div>

      <div className="Profile__VPR-desc mobile">
        #32 Global | #1 NA
      </div>

      <div className="Profile__VPR-Stat">
        <div>#3232</div>
        <span>NA</span>
      </div>

      <div className="Profile__VPR-Stat">
        <div>#1</div>
        <span>Global</span>
      </div>
    </div>
  )
}

const PlayerVPR = SkeletonContainer(Loading, Loaded);

export default PlayerVPR;