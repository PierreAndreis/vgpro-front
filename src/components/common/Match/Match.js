import React from "react";
import { translate } from "react-i18next";
import ReactGA from "react-ga";

import { KDA, Rate } from "./../ColoredValues";
import { SkeletonWrapper, SkeletonPayload } from "./../Skeleton";

import { Link } from "react-router-dom";

import Utils from "./../../../utils";
import TimeAgo from "./../../../i18n/timeAgo.js";

import MatchDetails from "./Details";

import * as Styled from "./Match.style.js";

// Polyfill Contains
function contains(node, other) {
  return node === other || !!(node.compareDocumentPosition(other) & 16);
}

const PlayerTeam = ({ player }) => (
  <Styled.Player>
    <Styled.PlayerHero type="heroes" name={player.hero} />
    <Link to={Utils.goToPlayer(player.name)}>
      {player.me ? <b>{player.name}</b> : player.name}
    </Link>
  </Styled.Player>
);

const MatchTeams = ({ payload, status }) => {
  let blueSide;
  let redSide;

  if (status === "loading") {
    blueSide = SkeletonPayload(5);
    redSide = SkeletonPayload(5);
  } else {
    blueSide = payload.players.filter(p => p.side === "left/blue");
    redSide = payload.players.filter(p => p.side === "right/red");
  }

  return (
    <React.Fragment>
      <Styled.PlayersTeam>
        {blueSide.map((player, index) => (
          <SkeletonWrapper
            key={index}
            status={status}
            render={(status, Skeleton) => {
              if (status === "loading") {
                return (
                  <div>
                    <Skeleton width="80px" />{" "}
                    <Skeleton
                      width="20px"
                      height="20px"
                      borderRadius="50%"
                    />
                  </div>
                );
              } else return <PlayerTeam key={player.id} player={player} />;
            }}
          />
        ))}
      </Styled.PlayersTeam>
      <Styled.PlayersTeam>
        {redSide.map((player, index) => (
          <SkeletonWrapper
            key={index}
            status={status}
            render={(status, Skeleton) => {
              if (status === "loading") {
                return (
                  <div>
                    <Skeleton
                      width="20px"
                      height="20px"
                      borderRadius="50%"
                    />{" "}
                    <Skeleton width="80px" />
                  </div>
                );
              } else return <PlayerTeam key={player.id} player={player} />;
            }}
          />
        ))}
      </Styled.PlayersTeam>
    </React.Fragment>
  );
};

const MatchInfo = ({ payload, me, status, t }) => {
  return (
    <Styled.MatchInfo>
      <SkeletonWrapper status={status} width="0">
        {() => (
          <Styled.MatchDuration>{payload.minutes}</Styled.MatchDuration>
        )}
      </SkeletonWrapper>

      <h2>
        <SkeletonWrapper status={status} width="50px">
          {() =>
            t(
              `gamemode.${payload.gameMode
                .replace(/ /g, "")
                .toLowerCase()}`
            )
          }
        </SkeletonWrapper>
      </h2>

      <Styled.MatchTime>
        <SkeletonWrapper status={status} width="60px">
          {() => <TimeAgo date={payload.ended} />}
        </SkeletonWrapper>
      </Styled.MatchTime>

      <Styled.MatchKDA>
        <SkeletonWrapper status={status} width="70px">
          {() => (
            <React.Fragment>
              <span className="k">{me.kills}</span>
              / <span className="death">{me.deaths}</span>
              / <span className="k">{me.assists}</span>
            </React.Fragment>
          )}
        </SkeletonWrapper>
      </Styled.MatchKDA>

      <Styled.MatchKDAText>
        <SkeletonWrapper status={status} width="80px">
          {() => (
            <React.Fragment>
              {" "}
              <KDA kda={me.kda} /> {t("terms.KDA")}{" "}
            </React.Fragment>
          )}
        </SkeletonWrapper>
      </Styled.MatchKDAText>
    </Styled.MatchInfo>
  );
};

const MatchStats = ({ payload, status, me, t }) => {
  let itemsWithout5v5Default = [];

  if (status === "loaded") {
    // In 5v5, HealingFlask and Vision Totems are default items. We don't need them.
    itemsWithout5v5Default = me.items;
    if (payload.gameMode.includes("5v5")) {
      itemsWithout5v5Default = me.items.filter(
        itemName =>
          itemName !== "Vision Totem" && itemName !== "Healing Flask"
      );
    }
  }

  let items = [];

  for (let i = 0; i < 6; i++) {
    let itemName;
    if (itemsWithout5v5Default[i]) {
      itemName = itemsWithout5v5Default[i];
    }

    items.push(
      <Styled.Item
        key={i}
        type="items"
        name={itemName}
        className="PlayerMatch-Item"
      />
    );
  }

  return (
    <Styled.MatchStats>
      <Styled.MatchVariables>
        <SkeletonWrapper
          status={status}
          render={(status, Skeleton) => {
            if (status === "loading") {
              return (
                <div>
                  <Skeleton width="85px" />
                </div>
              );
            }
            return (
              <Styled.Gold>
                <div>{me.gold.toLocaleString()}</div>
                (<Rate rate={me.goldShare} /> {t("terms.share")})
              </Styled.Gold>
            );
          }}
        />

        <SkeletonWrapper
          status={status}
          render={(status, Skeleton) => {
            if (status === "loading") {
              return (
                <div>
                  <Skeleton width="85px" />
                </div>
              );
            }
            return (
              <Styled.CS>
                <div>
                  {me.cs} {t("terms.cs")}
                </div>
                ({me.csMin} {t("terms.csMin")})
              </Styled.CS>
            );
          }}
        />
      </Styled.MatchVariables>

      <Styled.Items>{items}</Styled.Items>
    </Styled.MatchStats>
  );
};

class Match extends React.PureComponent {
  state = {
    details: false,
  };

  handleOpen = e => {
    if (contains(this.avoid, e.target) || this.props.status === "loading")
      return;

    const { payload } = this.props;

    ReactGA.event({
      category: "Players",
      action: "Open Match Details",
      label: payload.id,
    });

    this.setState(prevState => ({ details: !prevState.details }));
  };

  render() {
    const { payload, status, t } = this.props;

    let badges = [];
    let me;
    let winner = 1;

    if (status === "loaded") {
      me = payload.players.find(p => p.me);
      winner = me.winner;

      badges.push(
        <Styled.MatchBadge key={"win"} win={winner}>
          {(me.winner && t("terms.Win")) || t("terms.Loss")}
        </Styled.MatchBadge>
      );

      if (me.mvp) {
        badges.push(
          <Styled.MatchMVP key={"mvp"}>{t("terms.MVP")}</Styled.MatchMVP>
        );
      }
    }

    const shouldOpen =
      (this.props.forceOpen || this.state.details) &&
      this.props.status === "loaded";

    return (
      <React.Fragment>
        <Styled.Match winner={winner}>
          <Styled.MatchBody onClick={this.handleOpen}>
            {badges}

            <Styled.Avatar type="heroes" name={me && me.hero}>
              <SkeletonWrapper status={status} width="0">
                {() => (
                  <div
                    className="PlayerMatch-Avatar-Role"
                    id={me.role.toLowerCase()}
                  />
                )}
              </SkeletonWrapper>
            </Styled.Avatar>

            <MatchInfo payload={payload} me={me} status={status} t={t} />
            <MatchStats payload={payload} me={me} status={status} t={t} />

            <Styled.Players innerRef={ref => (this.avoid = ref)}>
              <MatchTeams payload={payload} status={status} />
            </Styled.Players>
          </Styled.MatchBody>
        </Styled.Match>
        {shouldOpen && (
          <MatchDetails
            matchId={payload.id}
            region={payload.shardId}
            playerName={me.name}
            details={payload}
            status={this.props.status}
            gameMode={payload.gameMode}
          />
        )}
      </React.Fragment>
    );
  }
}

export default translate()(Match);
