import React from "react";
import { bindActionCreators }  from "redux";
import { connect }             from "react-redux";

import { addFavorite, setFavorite } from "./../../../actions/user";

import { SkeletonWrapper } from "../../common/Skeleton";
import AssetLoader                   from "./../../common/AssetLoader";

import TimeAgo from "../../../i18n/timeAgo.js";
import Utils   from "../../../utils";
import "./PlayerInfo.css";

const regions = {
  "na": "North America",
  "eu": "Europe",
  "sg": "SouthEast Asia",
  "cn": "China",
  "sa": "South America",
};

let removeFromList = (fn, name, list) => (e) => {
  e.preventDefault();
  const l = list.filter(n => (name !== n));
  fn(l);
}

let addToList = (fn, name, list) => (e) => {
  e.preventDefault();

  if (list.length >= 8) {
    alert("You can't have more than 8 favorites!");
    return;
  }
  if (!list.includes(name)) {
    fn(name);
  }
}

const PlayerInfo = ({status, data, favorites, addFavorite, setFavorite}) => {

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
  let AKAs = [];
  let rankVst;
  let percentageVst;
  let favoriteClass;
  let favoriteClick;
  let rankingGlobal = 0;
  let rankingRegion = 0;
  let rankingRegionName = "...";

  if (status === "loaded") {
    rankVst = (data.rankVst) ? Number(data.rankVst).toFixed(0) : 0;
    percentageVst = Utils.getPercentageTillNext(data.tier, rankVst);

    AKAs = data.aka && data.aka.filter(k => k !== data.name);

    favoriteClass = "PlayerInfo-favorite fa fa-star-o";
    favoriteClick = addToList(addFavorite, data.name, favorites);

    if (favorites.includes(data.name)) {
      favoriteClass = "PlayerInfo-favorite fa fa-star"; 
      favoriteClick = removeFromList(setFavorite, data.name, favorites);
    }

    if (data.rankedRanking) {
      rankingGlobal = data.rankedRanking.global   === -1 ? "--" : data.rankedRanking.global;
      rankingRegion = data.rankedRanking.regional === -1 ? "--" : data.rankedRanking.regional;
      rankingRegionName = data.region === "sg" ? "SEA" : data.region.toUpperCase();
    }

  }

  return (
    <div className="PlayerInfo">
      <div className="PlayerInfo-info">
      <SkeletonWrapper status={status} width="140px" height="0">
        { () => (
            <AssetLoader type="tiers" className="PlayerInfo-tier" name={data.tier}>
              <div className="PlayerInfo-tier-bar">
                <div className="PlayerInfo-tier-bar-fill" style={{width: `${percentageVst}%`}}/>
                <div className="PlayerInfo-tier-bar-label">{rankVst}</div>
              </div>
            </AssetLoader>
          )}
      </SkeletonWrapper>
        
        
        <div className="PlayerInfo-details">
          <div className="PlayerInfo-icons">
            <SkeletonWrapper status={status} width="60px" height="20px">
              {() => <i className={favoriteClass} onClick={favoriteClick}/>}
            </SkeletonWrapper>
          </div>

          <div className="PlayerInfo-name">
            <SkeletonWrapper status={status} width="100px" height="25px">
              {() => <span>{data.name}</span>}
            </SkeletonWrapper>
          </div>
          <div className="PlayerInfo-desc">
            <SkeletonWrapper status={status} width="150px">
              {() => (
                [
                  <span key="region">{regions[data.region]}</span>,
                  <br key="br"/>,
                  <span key="skillTier">{Utils.getSkillTier(data.tier)}</span>
                ]
              )}
            </SkeletonWrapper>
          </div>
          <div className="PlayerInfo-update">
            Last updated: <br />
            <SkeletonWrapper status={status} width="80px" height="15px">
              { () => <TimeAgo date={data.lastCache} />}
            </SkeletonWrapper>
          </div>
        </div>
      </div>
      <div className="PlayerInfo-divider" />
      <div style={{textAlign: "center", margin: "10px"}}>
        <SkeletonWrapper status={status} width="130px" height="35px">
          {() => (
            <iframe src={`https://emojireact.com/embed?emojis=fire,whale&url=vgpro.gg/players/${data.region}/${data.name}`}
                    scrolling="no" 
                    frameBorder="0" 
                    style={{border:"none", 
                            overflow:"hidden", 
                            width:"130px", 
                            height:"35px",
                            }}
                    title="iFrame Emoji"
                    allowtransparency="true" />
          )}
        </SkeletonWrapper>
      </div>
      {/* {team} */}
      <div className="PlayerInfo-divider" />
      <div className="PlayerInfo-Stats">

        <h3>Ranked Ranking</h3>
        <div className="PlayerInfo-Stat">
          <div>
            #
            <SkeletonWrapper status={status} width="25px" height="15px">
              {() => rankingGlobal}
            </SkeletonWrapper>
          </div>
          <span>Global</span>
        </div>

        <div className="PlayerInfo-Stat">
          <div>
            #
            <SkeletonWrapper status={status} width="25px" height="15px">
              {() => rankingRegion}
            </SkeletonWrapper>
          </div>
          <span>
            <SkeletonWrapper status={status} 
                             width="25px" 
                             height="15px" 
                             children={() => rankingRegionName} />
          </span>
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

const mapStateToProps = state => {

  return {
    ...state.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addFavorite,
      setFavorite
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerInfo);
