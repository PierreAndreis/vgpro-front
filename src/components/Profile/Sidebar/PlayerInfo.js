import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { addFavorite, setFavorite } from "./../../../actions/user";

import { SkeletonWrapper } from "../../common/Skeleton";

import TimeAgo from "../../../i18n/timeAgo.js";
import Utils from "../../../utils";

import * as Styled from "./PlayerInfo.style";

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
};

let addToList = (fn, name, list) => (e) => {
  e.preventDefault();

  if (list.length >= 8) {
    alert("You can't have more than 8 favorites!");
    return;
  }
  if (!list.includes(name)) {
    fn(name);
  }
};

const PlayerInfo = ({ status, data, favorites, addFavorite, setFavorite }) => {

  let AKAs = [];
  let team;
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
      rankingGlobal = data.rankedRanking.global === -1 ? "--" : data.rankedRanking.global;
      rankingRegion = data.rankedRanking.regional === -1 ? "--" : data.rankedRanking.regional;
      rankingRegionName = data.region === "sg" ? "SEA" : data.region.toUpperCase();
    }

    team = (
      <Styled.Team>
        <Styled.TeamPhoto img={'/players/Chicken.png'} />
        <Styled.TeamDetails>
          <h4>Player of</h4>
          <span>Team SoloMid</span>
        </Styled.TeamDetails>
        <Styled.TeamLogo img={'/teams/TSM.png'} />

      </Styled.Team>
    );

  }

  return (
    <Styled.Wrap>
      <Styled.Content>
        <Styled.Info>
          <SkeletonWrapper status={status} width="140px" height="0">
            {() => (
              <Styled.Tier AssetLoader type="tiers" name={data.tier}>
                <Styled.TierBar percentage={percentageVst}>
                  <div />
                  <span>{rankVst}</span>
                </Styled.TierBar>
              </Styled.Tier>
            )}
          </SkeletonWrapper>

          <Styled.Details>
            <Styled.Icons>
              <SkeletonWrapper status={status} width="60px" height="20px">
                {() => <i className={favoriteClass} onClick={favoriteClick} />}
              </SkeletonWrapper>
            </Styled.Icons>

            <Styled.Name>
              <SkeletonWrapper status={status} width="100px" height="25px">
                {() => <span>{data.name}</span>}
              </SkeletonWrapper>
            </Styled.Name>

            <Styled.UnderName>
              <SkeletonWrapper status={status} width="150px">
                {() => (
                  [
                    <span key="region">{regions[data.region]}</span>,
                    <br key="br" />,
                    <span key="skillTier">{Utils.getSkillTier(data.tier)}</span>
                  ]
                )}
              </SkeletonWrapper>
            </Styled.UnderName>

            <Styled.LastUpdate>
              Last updated: <br />
              <SkeletonWrapper status={status} width="80px" height="15px">
                {() => <TimeAgo date={data.lastCache} />}
              </SkeletonWrapper>
            </Styled.LastUpdate>
          </Styled.Details>

        </Styled.Info>

        <Styled.Divider />

        <div style={{ textAlign: "center", margin: "10px" }}>
          <SkeletonWrapper status={status} width="130px" height="35px">
            {() => (
              <iframe src={`https://emojireact.com/embed?emojis=fire,whale,rocket&url=vgpro.gg/players/${data.region}/${data.name}`}
                scrolling="no"
                frameBorder="0"
                style={{
                  border: "none",
                  overflow: "hidden",
                  width: "180px",
                  height: "35px",
                }}
                title="iFrame Emoji"
                allowtransparency="true" />
            )}
          </SkeletonWrapper>
        </div>
        
          {team && (
            <React.Fragment>
              <Styled.Divider />
              {team}
            </React.Fragment>
          )}


        <Styled.Divider />
        <Styled.PlayerStats>

          <h3>Ranked Ranking</h3>
          <Styled.PlayerStat>
            <div>
              #
              <SkeletonWrapper status={status} width="25px" height="15px">
                {() => rankingGlobal}
              </SkeletonWrapper>
            </div>
            <span>Global</span>
          </Styled.PlayerStat>

          <Styled.PlayerStat>
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
          </Styled.PlayerStat>
        </Styled.PlayerStats>

        {AKAs && AKAs.length > 0 &&
        (
          <React.Fragment>
            <Styled.Divider />
            <Styled.PlayerAka>
              <h2> Also known as </h2>
              {AKAs.map(name => <span key={name}>{name}</span>)}
            </Styled.PlayerAka>
          </React.Fragment>
        )
        }
      </Styled.Content>
    </Styled.Wrap>
  )
};

const mapStateToProps = state => {

  return {
    ...state.user
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addFavorite,
      setFavorite
    },
    dispatch
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerInfo);
