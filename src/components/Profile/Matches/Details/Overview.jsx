import React from "react";
import { Link } from "react-router-dom";

import {KDA} from "../../../common/ColoredValues";

import Utils from "../../../../utils";
import AssetLoader from "../../../common/AssetLoader";

import { SkeletonWrapper, SkeletonPayload } from "./../../../common/Skeleton";

import "./Overview.css";

const OverviewPlayer = ({player, telemetry, status}) => {
  
  const items = [];

  for (let i = 0; i < 6; i++) {
    let name;
    if (player.items && player.items[i]) {
      name = player.items[i];
    }

    items.push(<AssetLoader key={i} type="items" className="Overview-Player-Item" name={name} />);
  };

  let damage = "...";
  let damagePercent = "0%"
  let damageTaken = "...";
  let damageTakenPercent = "0%"
  let healingDone = "...";
  let healingDonePercent = "0%";

  if (telemetry) {
    damage             = Utils.minifyNumber(telemetry.dealt, 0);
    damageTaken        = Utils.minifyNumber(telemetry.taken, 0);
    healingDone        = Utils.minifyNumber(telemetry.healed, 0);

    damagePercent      = telemetry.damageShare;
    damageTakenPercent = telemetry.takenShare;
    healingDonePercent = telemetry.healingShare;
  }
  let heroName;

  if (status === "loaded") {
    heroName = player.hero;
  }

  return (
    <React.Fragment>
      <div className="Overview-Player-Info">
        <div className="Overview-Player-Image">
          <AssetLoader type="heroes" className="Overview-Player-Image-Hero" name={heroName}>
            <SkeletonWrapper status={status} width="0" height="0">
              {() => <div className="Overview-Player-Image-Role" id={player.role.toLowerCase()} />}
            </SkeletonWrapper>
          </AssetLoader>
        </div>
        <div className="Overview-Player-Info-details">
          <SkeletonWrapper status={status} width="45px" height="9px">
            {() => (
              <Link to={Utils.goToPlayer(player.name)} className="Overview-Player-Info-Name">
                {player.name}
              </Link>
            )}
            </SkeletonWrapper>
          <div className="Overview-Player-Info-KDA">
            <SkeletonWrapper status={status} width="35px">
              {() => (
                <React.Fragment>
                  <span>{player.kills}</span> / <span className="d">{player.deaths}</span> / <span>{player.assists}</span>
                  <div><KDA kda={player.kda} /> KDA</div>
                </React.Fragment>
              )}
            </SkeletonWrapper>
          </div>
        </div>
      </div>
      <div className="Overview-Player-Items">
        {items}
      </div>
      <div className="Overview-Player-Stats">

        <div className="Overview-Player-Stats-Game">
          <div className="Overview-Player-CS">
            <SkeletonWrapper status={status} width="15px" height="10px">{() => player.cs}</SkeletonWrapper>
          </div>
          <div className="Overview-Player-Gold">
            <SkeletonWrapper status={status} width="15px" height="10px">{() => Utils.minifyNumber(player.gold, 0)}</SkeletonWrapper>
          </div>
        </div>

        <div className="Overview-Player-Damage">
          <div className="Overview-Player-Damage-bar">
            <div className="Overview-Player-Damage-fill" style={{width: damagePercent}} />
          </div>
          <div className="Overview-Player-Damage-label"> {damage} </div>
        </div>
        
        <div className="Overview-Player-Damage">
          <div className="Overview-Player-Damage-bar">
            <div className="Overview-Player-Damage-fill Healing" style={{width: healingDonePercent}} />
          </div>
          <div className="Overview-Player-Damage-label"> {healingDone} </div>
        </div>
        
        <div className="Overview-Player-Damage">
          <div className="Overview-Player-Damage-bar">
            <div className="Overview-Player-Damage-fill DamageTaken" style={{width: damageTakenPercent}} />
          </div>
          <div className="Overview-Player-Damage-label"> {damageTaken} </div>
        </div>

      </div>
      <div className="Overview-Player-Rank">
        <SkeletonWrapper status={status} width="30px" height="40px">
          {() => (
            <React.Fragment>
              <AssetLoader className="Overview-Player-Tier" type="tiers" name={player.tier} />
              <div className="Overview-Player-RankPoints">{player.rankvst.toFixed(0)}</div>
            </React.Fragment>
          )}
        </SkeletonWrapper>
      </div>
    </React.Fragment>
  )
};

const TeamStats = ({team, bans, status}) => (
  <div className="Overview-Cell Overview-Team-Info">
    <div className="Overview-Legends">
      <div className="Overview-Legends-DamageDone">Damage Done</div>
      <div className="Overview-Legends-HealingDone">Healing Done</div>
      <div className="Overview-Legends-DamageTaken">Damage Taken</div>
    </div>
    <div className="Overview-Team-Stats">
    { bans &&
      <AssetLoader className="Overview-Team-Ban" type="heroes" name={bans.Hero} />
    }
      <div className="Overview-Team-Values">
        <div className="Overview-Team-Top">
          <div className="Overview-Team-Gold">
            <SkeletonWrapper status={status} width="30px" height="13px">
              {() => Utils.minifyNumber(team.gold)}
            </SkeletonWrapper>
          </div>
        </div>
        <div className="Overview-Team-Others">
          <div className="Overview-Team-Turret">
            <SkeletonWrapper status={status} width="20px" height="13px">{() => team.turretKills}</SkeletonWrapper>
          </div>
          <div className="Overview-Team-Kraken">
            <SkeletonWrapper status={status} width="20px" height="13px">{() => team.krakenCaptures}</SkeletonWrapper>
          </div>
        </div>
      </div>
      <div className="Overview-Team-Score">
        <div><SkeletonWrapper status={status} width="30px" height="25px">{() => team.heroKills}</SkeletonWrapper></div>
        <span>Kills</span>
      </div>
    </div>
  </div>
)

const OverviewTeam = ({team, telemetry, status}) => {

  let players = SkeletonPayload(3);
  // Sort by role
  if (status === "loaded") {
    players = team.players.sort((a, b) => {
      /**/ if (a.role > b.role) return -1;
      else if (a.role < b.role) return 1;
      else return 0;
    });
  }

  const tName = (t) => t === "1" ? "right/red" : "left/blue";
  const tName2 = (team.side === "right/red") ? "red" : "blue";

  let bans = null;
  if (telemetry && telemetry.draft) {
    bans = telemetry.draft.find(b => {
      return b.Type === "HeroBan" && tName(b.Team) === team.side;
    });
  };
  

  return (
    <div className="Overview-Team">
      <div className="Overview-Cell Overview-Header">
        <div className="Overview-Player-Info"> 
          <SkeletonWrapper status={status} width="30px">
            {() => {
              if (team && team.players && team.players[0]) {
                return (
                  <React.Fragment>
                    {team.players[0].winner ? 
                      <span className="win">Win</span> 
                    : <span className="loss">Loss</span>
                    }
                    <span style={{padding: "0 2px"}}>
                      {team.side === "right/red" ? 
                      "Red Team" : "Blue Team"}
                    </span>
                  </React.Fragment>
                )
              }
              return null;
            }}
          </SkeletonWrapper>
        </div>
        <div className="Overview-Player-Items">Items</div>
        <div className="Overview-Player-Stats">Stats</div>
        <div className="Overview-Player-Rank">Rank</div>
      </div>
      {players.map((p, i) => {
        let tm = false;
        if (telemetry && telemetry.facts) {
          tm = telemetry.facts[tName2][p.hero];
        }
        const key = (p.id) ? p.id : i;

        return (
          <div key={key} className="Overview-Cell Overview-Player">
            <OverviewPlayer status={status} player={p} telemetry={tm}/>
          </div>
        )
      })}
      <TeamStats status={status} team={team} bans={bans}/>
    </div>
  )
   
}

export default class extends React.Component {

  render() {
    const {teams, telemetry, status} = this.props
    return (
      <div className="MatchDetails-Overview">
          {
            teams.map((team, i) => {
              return <OverviewTeam key={i} status={status} team={team} telemetry={telemetry}/>
            })
          }
      </div>
    )
  }
};