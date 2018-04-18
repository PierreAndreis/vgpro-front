import React from "react";

import { KDA } from "../../ColoredValues";

import Utils from "../../../../utils";

import { SkeletonWrapper, SkeletonPayload } from "./../../Skeleton";

import * as Styled from "./Overview.style";

const OverviewPlayer = ({ player, telemetry, gameMode, status }) => {

  const items = [];

  let playerItems = (status === "loaded") ? player.items : [];

  let rankPoints = player.rankvst;
  if (gameMode.includes("5v5")) rankPoints = player.rank5v5vst;
  if (gameMode.includes("Blitz")) rankPoints = player.blitzvst;
  if (gameMode.includes("Battle Royale")) rankPoints = Math.max(player.rank5v5vst, player.rankvst);

  let tier = Utils.getTier(rankPoints);

  // In 5v5, HealingFlask and Vision Totems are default items. We don't need them.
  let itemsWithout5v5Default = playerItems;
  if (gameMode.includes("5v5")) {
    itemsWithout5v5Default = playerItems.filter(itemName => itemName !== "Vision Totem" && itemName !== "Healing Flask");
  }


  for (let i = 0; i < 6; i++) {
    let name;
    if (itemsWithout5v5Default && itemsWithout5v5Default[i]) {
      name = itemsWithout5v5Default[i];
    }

    items.push(<Styled.PlayerItem key={i} type="items" name={name} />);
  };

  let damage = "...";
  let damagePercent = "0"
  let damageTaken = "...";
  let damageTakenPercent = "0"
  let healingDone = "...";
  let healingDonePercent = "0";

  if (telemetry) {
    damage = Utils.minifyNumber(telemetry.dealt, 0);
    damageTaken = Utils.minifyNumber(telemetry.taken, 0);
    healingDone = Utils.minifyNumber(telemetry.healed, 0);

    damagePercent = telemetry.damageShare;
    damageTakenPercent = telemetry.takenShare;
    healingDonePercent = telemetry.healingShare;
  }
  let heroName;

  if (status === "loaded") {
    heroName = player.hero;
  }

  return (
    <React.Fragment>
      <Styled.PlayerInfo>

        <Styled.PlayerImage>
          <Styled.PlayerHero type="heroes" name={heroName}>
            <SkeletonWrapper status={status} width="0" height="0">
              {() => <Styled.PlayerRole role={player.role} />}
            </SkeletonWrapper>

            {player && player.mvp && <Styled.MVP>MVP</Styled.MVP>}
          </Styled.PlayerHero>
        </Styled.PlayerImage>

        <Styled.PlayerDetails>
          <SkeletonWrapper status={status} width="45px" height="9px">
            {() => (
              <Styled.PlayerName to={Utils.goToPlayer(player.name)}>
                {player.name}
              </Styled.PlayerName>
            )}
          </SkeletonWrapper>
          <Styled.PlayerKDA>
            <SkeletonWrapper status={status} width="35px">
              {() => (
                <React.Fragment>
                  <span>{player.kills}</span> / <span className="d">{player.deaths}</span> / <span>{player.assists}</span>
                  <div><KDA kda={player.kda} /> KDA</div>
                </React.Fragment>
              )}
            </SkeletonWrapper>
          </Styled.PlayerKDA>
        </Styled.PlayerDetails>
      </Styled.PlayerInfo>

      <Styled.PlayerItems>
        {items}
      </Styled.PlayerItems>

      <Styled.PlayerStats>

        <Styled.PlayerGameStats>
          <Styled.GameStats farm>
            <SkeletonWrapper status={status} width="15px" height="10px">{() => player.cs}</SkeletonWrapper>
          </Styled.GameStats>
          <Styled.GameStats gold>
            <SkeletonWrapper status={status} width="15px" height="10px">{() => Utils.minifyNumber(player.gold, 0)}</SkeletonWrapper>
          </Styled.GameStats>
        </Styled.PlayerGameStats>

        <Styled.PlayerGraph>
          <Styled.PlayerGraphBar type="done" percent={damagePercent + "%"}>
            <div />
          </Styled.PlayerGraphBar>
          <span> {damage} </span>
        </Styled.PlayerGraph>

        <Styled.PlayerGraph>
          <Styled.PlayerGraphBar type="healing" percent={healingDonePercent + "%"}>
            <div />
          </Styled.PlayerGraphBar>
          <span> {healingDone} </span>
        </Styled.PlayerGraph>

        <Styled.PlayerGraph>
          <Styled.PlayerGraphBar type="taken" percent={damageTakenPercent + "%"}>
            <div />
          </Styled.PlayerGraphBar>
          <span> {damageTaken} </span>
        </Styled.PlayerGraph>

      </Styled.PlayerStats>

      <Styled.PlayerRank>
        <SkeletonWrapper status={status} width="30px" height="40px">
          {() => (
            <React.Fragment>
              <Styled.PlayerTier type="tiers" name={tier} />
              <span>{rankPoints.toFixed(0)}</span>
            </React.Fragment>
          )}
        </SkeletonWrapper>
      </Styled.PlayerRank>
    </React.Fragment>
  )
};

const TeamStats = ({ team, bans, status }) => (
  <Styled.CellTeam>
    <Styled.Legend>
      <Styled.LegendBall type="done">Damage Done</Styled.LegendBall>
      <Styled.LegendBall type="healing">Healing Done</Styled.LegendBall>
      <Styled.LegendBall type="taken">Damage Taken</Styled.LegendBall>
    </Styled.Legend>

    <Styled.TeamStats>
      {
        bans.map((ban) => <Styled.TeamBan key={ban.Hero} type="heroes" name={ban.Hero} />)
      }

      <Styled.TeamValues>

        <div>
          <Styled.TeamIcon icon="gold">
            <SkeletonWrapper status={status} width="30px" height="13px">
              {() => Utils.minifyNumber(team.gold)}
            </SkeletonWrapper>
          </Styled.TeamIcon>
        </div>

        <div>

          <Styled.TeamIcon icon="sentry" ext="png">
            <SkeletonWrapper status={status} width="20px" height="13px">{() => team.turretKills}</SkeletonWrapper>
          </Styled.TeamIcon>

          <Styled.TeamIcon icon="kraken">
            <SkeletonWrapper status={status} width="20px" height="13px">{() => team.krakenCaptures}</SkeletonWrapper>
          </Styled.TeamIcon>

        </div>
      </Styled.TeamValues>

      <Styled.TeamScore>
        <div><SkeletonWrapper status={status} width="30px" height="25px">{() => team.heroKills}</SkeletonWrapper></div>
        <span>Kills</span>
      </Styled.TeamScore>

    </Styled.TeamStats>
  </Styled.CellTeam>
)

const OverviewTeam = ({ team, telemetry, status, gameMode }) => {

  let players = SkeletonPayload(gameMode.includes("5v5") ? 5 : 3);
  // Sort by role
  if (status === "loaded") {
    players = team.players.sort((a, b) => {
      /**/ if (a.role > b.role) return -1;
      else if (a.role < b.role) return 1;
      else return 0;
    });
  }

  const tName = (t) => t !== "1" ? "right/red" : "left/blue";
  const tName2 = (team.side === "right/red") ? "red" : "blue";

  let bans = [];
  if (telemetry && telemetry.draft) {
    bans = telemetry.draft.filter(b => {
      return b.Type === "HeroBan" && tName(b.Team) === team.side;
    });
  };


  return (
    <Styled.Team>
      <Styled.CellHeader>
        <Styled.PlayerInfo>
          <SkeletonWrapper status={status} width="30px">
            {() => {
              if (team && team.players && team.players[0]) {
                return (
                  <React.Fragment>
                    {team.players[0].winner ?
                      <span className="win">Win</span>
                      : <span className="loss">Loss</span>
                    }
                    <span style={{ padding: "0 2px" }}>
                      {team.side === "right/red" ?
                        "Red Team" : "Blue Team"}
                    </span>
                  </React.Fragment>
                )
              }
              return null;
            }}
          </SkeletonWrapper>
        </Styled.PlayerInfo>
        <Styled.PlayerItems>Items</Styled.PlayerItems>
        <Styled.PlayerStats>Stats</Styled.PlayerStats>
        <Styled.PlayerRank>Rank</Styled.PlayerRank>
      </Styled.CellHeader>
      {players.map((p, i) => {
        let tm = false;
        if (telemetry && telemetry.facts) {
          tm = telemetry.facts[tName2][p.hero];
        }
        const key = (p.id) ? p.id : i;

        return (
          <Styled.CellPlayer key={key} me={p.me}>
            <OverviewPlayer status={status} player={p} telemetry={tm} gameMode={gameMode} />
          </Styled.CellPlayer>
        )
      })}
      <TeamStats status={status} team={team} bans={bans} />
    </Styled.Team>
  )

}

export default class extends React.Component {

  render() {
    const { teams, telemetry, status, gameMode } = this.props
    return (
      <Styled.Wrap>
        {
          teams.map((team, i) => {
            return <OverviewTeam key={i} status={status} team={team} telemetry={telemetry} gameMode={gameMode} />
          })
        }
      </Styled.Wrap>
    )
  }
};