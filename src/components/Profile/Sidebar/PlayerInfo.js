import React from "react";
import { Trans } from "react-i18next";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { addFavorite, setFavorite } from "./../../../actions/user";

import { SkeletonWrapper } from "../../common/Skeleton";

import TimeAgo from "../../../i18n/timeAgo.js";
import Utils from "../../../utils";

import * as Styled from "./PlayerInfo.style";

const regions = {
  na: "North America",
  eu: "Europe",
  sg: "SouthEast Asia",
  cn: "China",
  sa: "South America",
};

// LUL. THIS SHOULD BE SERVER
const TRIBE_PLAYERS = [
  "ttigers",
  "Oldskool",
  "gabevizzle",
  "DNZio",
  "MaxGreen",
  "iLoveJoseph",
  "Xelciar",
];

let removeFromList = (fn, name, list) => e => {
  e.preventDefault();
  const l = list.filter(n => name !== n);
  fn(l);
};

let addToList = (fn, name, list) => e => {
  e.preventDefault();

  if (list.length >= 8) {
    alert("You can't have more than 8 favorites!");
    return;
  }
  if (!list.includes(name)) {
    fn(name);
  }
};

const PlayerInfo = ({
  status,
  data,
  favorites,
  addFavorite,
  setFavorite,
}) => {
  let AKAs = [];
  let team;
  let rankVst;
  let percentageVst;
  let favoriteClass;
  let favoriteClick;
  let rankingGlobal = 0;
  let rankingRegion = 0;
  let rankingRegionName = "...";

  let ranking5v5Global = 0;
  let ranking5v5Region = 0;

  let tier = -1;

  if (status === "loaded") {
    rankVst = Math.max(Number(data.rankVst), Number(data.rank5v5Vst), 0);
    tier = Utils.getTier(rankVst);

    percentageVst = Utils.getPercentageTillNext(tier, rankVst);

    AKAs = data.aka && data.aka.filter(k => k !== data.name);

    favoriteClass = "PlayerInfo-favorite fa fa-star-o";
    favoriteClick = addToList(addFavorite, data.name, favorites);

    if (favorites.includes(data.name)) {
      favoriteClass = "PlayerInfo-favorite fa fa-star";
      favoriteClick = removeFromList(setFavorite, data.name, favorites);
    }

    rankingRegionName =
      data.region === "sg" ? "SEA" : data.region.toUpperCase();

    if (data.rankedRanking) {
      rankingGlobal =
        data.rankedRanking.global === -1
          ? "--"
          : data.rankedRanking.global;
      rankingRegion =
        data.rankedRanking.regional === -1
          ? "--"
          : data.rankedRanking.regional;
    }

    if (data.ranked5v5Ranking) {
      ranking5v5Global =
        data.ranked5v5Ranking.global === -1
          ? "--"
          : data.ranked5v5Ranking.global;
      ranking5v5Region =
        data.ranked5v5Ranking.regional === -1
          ? "--"
          : data.ranked5v5Ranking.regional;
    }

    if (TRIBE_PLAYERS.includes(data.name)) {
      team = (
        <Styled.Team>
          <Styled.TeamPhoto img={`/players/${data.name}.png`} />
          <Styled.TeamDetails>
            <h4>
              <Trans i18nKey="profile.PlayerOf" />
            </h4>
            <span>Tribe Gaming</span>
          </Styled.TeamDetails>
          <Styled.TeamLogo img={"/teams/tribe.png"} />
        </Styled.Team>
      );
    }
  }

  return (
    <Styled.Wrap>
      <Styled.Content>
        <Styled.Info>
          <SkeletonWrapper status={status} width="140px" height="0">
            {() => (
              <Styled.Tier type="tiers" name={tier}>
                <Styled.TierBar percentage={percentageVst}>
                  <div />
                  <span>{rankVst.toFixed(0)}</span>
                </Styled.TierBar>
              </Styled.Tier>
            )}
          </SkeletonWrapper>

          <Styled.Details>
            <Styled.Icons>
              <SkeletonWrapper status={status} width="60px" height="20px">
                {() => (
                  <i className={favoriteClass} onClick={favoriteClick} />
                )}
              </SkeletonWrapper>
            </Styled.Icons>

            <Styled.Name>
              <SkeletonWrapper status={status} width="100px" height="25px">
                {() => <span>{data.name}</span>}
              </SkeletonWrapper>
            </Styled.Name>

            <Styled.UnderName>
              <SkeletonWrapper status={status} width="150px">
                {() => [
                  <span key="region">{regions[data.region]}</span>,
                  <br key="br" />,
                  <span key="skillTier">{Utils.getSkillTier(tier)}</span>,
                ]}
              </SkeletonWrapper>
            </Styled.UnderName>

            <Styled.LastUpdate>
              <Trans i18nKey="general.lastUpdated" /> <br />
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
              <iframe
                src={`https://emojireact.com/embed?emojis=fire,whale,rocket&url=vgpro.gg/players/${
                  data.region
                }/${data.name}`}
                scrolling="no"
                frameBorder="0"
                style={{
                  border: "none",
                  overflow: "hidden",
                  width: "180px",
                  height: "35px",
                }}
                title="iFrame Emoji"
                allowtransparency="true"
              />
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
          <h3>
            <Trans i18nKey="gamemode.ranked" />{" "}
            <Trans i18nKey="terms.Rank" />
          </h3>
          <Styled.PlayerStat>
            <div>
              #
              <SkeletonWrapper status={status} width="25px" height="15px">
                {() => rankingGlobal}
              </SkeletonWrapper>
            </div>
            <span>
              <Trans i18nKey="terms.global" />
            </span>
          </Styled.PlayerStat>

          <Styled.PlayerStat>
            <div>
              #
              <SkeletonWrapper status={status} width="25px" height="15px">
                {() => rankingRegion}
              </SkeletonWrapper>
            </div>
            <span>
              <SkeletonWrapper
                status={status}
                width="25px"
                height="15px"
                children={() => rankingRegionName}
              />
            </span>
          </Styled.PlayerStat>
          <Styled.Divider />
          <br />
          <h3>
            <Trans i18nKey="gamemode.ranked5v5" />{" "}
            <Trans i18nKey="terms.Rank" />
          </h3>

          <Styled.PlayerStat>
            <div>
              #
              <SkeletonWrapper status={status} width="25px" height="15px">
                {() => ranking5v5Global}
              </SkeletonWrapper>
            </div>
            <span>
              <Trans i18nKey="terms.global" />
            </span>
          </Styled.PlayerStat>

          <Styled.PlayerStat>
            <div>
              #
              <SkeletonWrapper status={status} width="25px" height="15px">
                {() => ranking5v5Region}
              </SkeletonWrapper>
            </div>
            <span>
              <SkeletonWrapper
                status={status}
                width="25px"
                height="15px"
                children={() => rankingRegionName}
              />
            </span>
          </Styled.PlayerStat>
        </Styled.PlayerStats>

        {AKAs &&
          AKAs.length > 0 && (
            <React.Fragment>
              <Styled.Divider />
              <Styled.PlayerAka>
                <h2>
                  <Trans i18nKey="terms.aka" />{" "}
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {AKAs.map(name => <span key={name}>{name}</span>)}
                </div>
              </Styled.PlayerAka>
            </React.Fragment>
          )}
      </Styled.Content>
    </Styled.Wrap>
  );
};

const mapStateToProps = state => {
  return {
    ...state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addFavorite,
      setFavorite,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);
