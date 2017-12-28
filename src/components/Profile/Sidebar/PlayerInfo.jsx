import React from "react";

import {Skeleton, SkeletonContainer} from "../../common/Skeleton";

import TimeAgo from "../../../i18n/timeAgo.js";
import Utils from "../../../utils";
import "./PlayerInfo.css";

const regions = {
  "na": "North America",
  "eu": "Europe",
  "sg": "SouthEast Asia",
  "cn": "China",
  "sa": "South America",
}



const Loaded = ({data}) => {

  // const team = (
  //     <div className="PlayerInfo-Team">
  //       <div className="PlayerInfo-Team-Picture" style={{backgroundImage: `url(https://vgpro.gg/assets/players_pics/StartingAllOver.jpg)`}} />
  //       <div className="PlayerInfo-Team-details">
  //         <h4>Carry of</h4>
  //         <div className="PlayerInfo-Team-name">Tribe Gaming</div>
  //       </div>
  //       <div className="PlayerInfo-Team-logo" style={{backgroundImage: `url(https://vgpro.gg/assets/teams/TRB.png)`}} />
      
  //     </div>
  // );


  const rankVst = (data.rankVst) ? Number(data.rankVst).toFixed(0) : 0;
  const percentageVst = Utils.getPercentageTillNext(data.tier, rankVst);

  const AKAs = data.aka && data.aka.filter(k => k !== data.name);

  return (
    <div className="PlayerInfo">
      <div className="PlayerInfo-info">
        <div className="PlayerInfo-tier" style={{backgroundImage: `url(http://vgpro.gg/assets/images/skilltier/${parseInt(data.tier, 10) + 2}.png)`}}>
          <div className="PlayerInfo-tier-bar">
            <div className="PlayerInfo-tier-bar-fill" style={{width: `${percentageVst}%`}}/>
            <div className="PlayerInfo-tier-bar-label">{rankVst}</div>
          </div>
        </div>
        
        <div className="PlayerInfo-details">
          <div className="PlayerInfo-name">
            {data.name}
          </div>
          <div className="PlayerInfo-desc">
            {regions[data.region]} <br />
            {Utils.getSkillTier(data.tier)}
          </div>
          <div className="PlayerInfo-update">
            Last updated: <br />
            <TimeAgo date={data.lastCache} />
          </div>
        </div>
      </div>

      {/* {team} */}
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
      {AKAs && AKAs.length > 0 &&
        <div className="PlayerInfo-AKA">
          <h2> Also known as </h2>
            {AKAs.map(name => <span key={name}>{name}</span>)}
        </div>
      }
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