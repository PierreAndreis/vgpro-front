import React from "react";

import {Skeleton, SkeletonContainer} from "../../common/Skeleton";

import TimeAgo from "../../../i18n/timeAgo.js";

import "./PlayerInfo.css";

const Loaded = ({data}) => {

  const team = (
      <div className="PlayerInfo-Team">
        <div className="PlayerInfo-Team-Picture" style={{backgroundImage: `url(https://vgpro.gg/assets/players_pics/StartingAllOver.jpg)`}} />
        <div className="PlayerInfo-Team-details">
          <h4>Carry of</h4>
          <div className="PlayerInfo-Team-name">Tribe Gaming</div>
        </div>
        <div className="PlayerInfo-Team-logo" style={{backgroundImage: `url(https://vgpro.gg/assets/teams/TRB.png)`}} />
      
      </div>
  );


  return (
    <div className="PlayerInfo">
      <div className="PlayerInfo-info">
        <div className="PlayerInfo-tier" style={{backgroundImage: `url(http://vgpro.gg/assets/images/skilltier/${parseInt(data.tier, 10) + 2}.png)`}}>
          <div className="PlayerInfo-tier-bar">
            <div className="PlayerInfo-tier-bar-fill" style={{width: "20%"}}/>
            <div className="PlayerInfo-tier-bar-label">2323</div>
          </div>
        </div>
        <div className="PlayerInfo-details">
          <div className="PlayerInfo-name">
            {data.name}
          </div>
          <div className="PlayerInfo-desc">
            Lorem impson
          </div>
          <div className="PlayerInfo-update">
            Last updated: <br />
            <TimeAgo date={data.lastCache} />
          </div>
        </div>
      </div>

        {team}
      <div className="PlayerInfo-VPR">
        <div className="PlayerInfo-Stat">
          <div>#3232</div>
          <span>Global</span>
        </div>

        <div className="PlayerInfo-Stat">
          <div>#1</div>
          <span>NA</span>
        </div>

        <div className="PlayerInfo-Stat VPR">
          <div>2,381</div>
          <span>VGPRO RATING</span>
        </div>
      </div>
    </div>
  )
}

const Loading = () => {
  return (
    <div className="PlayerInfo">
      <div className="PlayerInfo-info">
        <div className="PlayerInfo-tier">
        </div>

        <div className="PlayerInfo-details">
          <div className="PlayerInfo-name">
            <Skeleton width="100px" height="20px"/>
          </div>
          <div className="PlayerInfo-desc">
            <Skeleton width="100px" />
          </div>
          <div className="PlayerInfo-update">
            Last updated: <Skeleton width="80px" height="20px" />
          </div>
        </div>
      </div>
      <div className="PlayerInfo-VPR">
        <div className="PlayerInfo-Stat">
          <div><Skeleton width="50px"/></div>
          <span>Global</span>
        </div>

        <div className="PlayerInfo-Stat">
          <div><Skeleton width="50px"/></div>
          <span><Skeleton width="10px" height="10px" /></span>
        </div>

        <div className="PlayerInfo-Stat VPR">
          <div><Skeleton width="50px"/></div>
          <span>VGPRO RATING</span>
        </div>
      </div>
    </div>
  )
}

const PlayerInfo = SkeletonContainer(Loading, Loaded);

export default PlayerInfo;