import React from "react";
import { Link } from "react-router-dom";

import {KDA} from "../../common/ColoredValues";

import "./MatchDetails.css";

import {fetchMatchDetails, fetchMatchTelemetry} from "./../../../actions/api";

import Utils from "../../../utils";

const OverviewPlayer = ({player, telemetry}) => {
  
  const items = [];

  for (let i = 0; i < 6; i++) {
    let style;
    if (player.items[i]) {
      const name = player.items[i].replace(/([ ])+/g, "-").replace("'", "").toLowerCase();
      style = {
        backgroundImage: `url(http://vgpro.gg/assets/images/items/${name}.png)`
      }
    }

    items.push(<div key={i} className="Overview-Player-Item" style={style}/>);
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

  return (
    <React.Fragment>
      <div className="Overview-Player-Info">
        <div className="Overview-Player-Image">
          <div className="Overview-Player-Image-Hero" style={{
                  backgroundImage: `url(http://vgpro.gg/assets/images/heroes/${player.hero.toLowerCase()}.gif)`
              }}>
            <div className="Overview-Player-Image-Role" id={player.role.toLowerCase()} />
          </div>
        </div>
        <div className="Overview-Player-Info-details">
          <Link to={Utils.goToPlayer(player.name)} className="Overview-Player-Info-Name">
            {player.name}
          </Link>
          <div className="Overview-Player-Info-KDA">
            <span>{player.kills}</span> / <span className="d">{player.deaths}</span> / <span>{player.assists}</span>
            <div><KDA kda={player.kda} /> KDA</div>
          </div>
        </div>
      </div>
      <div className="Overview-Player-Items">
        {items}
      </div>
      <div className="Overview-Player-Stats">

        <div className="Overview-Player-Stats-Game">
          <div className="Overview-Player-CS">{player.cs}</div>
          <div className="Overview-Player-Gold">{Utils.minifyNumber(player.gold, 0)}</div>
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
        <div className="Overview-Player-Tier" 
          style={{backgroundImage: `url(http://vgpro.gg/assets/images/skilltier/${player.tier + 2}.png`}} 
        />
        <div className="Overview-Player-RankPoints">{player.rankvst.toFixed(0)}</div>
      </div>
    </React.Fragment>
  )
};

const TeamStats = ({team, bans}) => (
  <div className="Overview-Cell Overview-Team-Info">
    <div className="Overview-Legends">
      <div className="Overview-Legends-DamageDone">Damage Done</div>
      <div className="Overview-Legends-HealingDone">Healing Done</div>
      <div className="Overview-Legends-DamageTaken">Damage Taken</div>
    </div>
    <div className="Overview-Team-Stats">
    { bans &&
      <div className="Overview-Team-Ban" style={{
        backgroundImage: `url(http://vgpro.gg/assets/images/heroes/${bans.Hero.toLowerCase()}.gif)`
      }}/>
    }
      <div className="Overview-Team-Values">
        <div className="Overview-Team-Top">
          <div className="Overview-Team-Gold">{Utils.minifyNumber(team.gold)}</div>
        </div>
        <div className="Overview-Team-Others">
          <div className="Overview-Team-Turret">{team.turretKills}</div>
          <div className="Overview-Team-Kraken">{team.krakenCaptures}</div>
        </div>
      </div>
      <div className="Overview-Team-Score">
        <div>{team.heroKills}</div>
        <span>Kills</span>
      </div>
    </div>
  </div>
)


const OverviewTeam = ({team, telemetry}) => {

  // Sort by role
  const players = team.players.sort((a, b) => {
    /**/ if (a.role > b.role) return -1;
    else if (a.role < b.role) return 1;
    else return 0;
  });

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
        {team.players[0].winner ? <span className="win">Win</span> : <span className="loss">Loss</span>}
        <span style={{padding: "0 2px"}}>{team.side === "right/red" ? "Red Team" : "Blue Team"}</span>
      </div>
      <div className="Overview-Player-Items">Items</div>
      <div className="Overview-Player-Stats">Stats</div>
      <div className="Overview-Player-Rank">Rank</div>
    </div>
    {players.map(p => {
      let tm = false;
      if (telemetry && telemetry.facts) {
        tm = telemetry.facts[tName2][p.hero];
      }
      return (
        <div key={p.id} className="Overview-Cell Overview-Player">
          <OverviewPlayer player={p} telemetry={tm}/>
        </div>
      )
    })}
    <TeamStats team={team} bans={bans}/>
  </div>
  )
   
}


class MatchDetails extends React.Component{

  state = {
    detailsStatus: "loading",
    telemetry: null,
    details: null,
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const {matchId, region} = this.props;

    this.setState({
      detailsStatus: "loading",
      telemetry: null,
    });

    fetchMatchDetails(matchId, region)
      .then(res => {
        this.setState({
          detailsStatus: "loaded",
          details: res,
        })
      })

    fetchMatchTelemetry(matchId, region)
      .then(res => {
        this.setState({
          telemetry: res,
        })
      });
  }

  render() {
    
    const {
      telemetry,
      detailsStatus,
      details
    } = this.state;

    let content = null;

    if (detailsStatus === "loading") content = <div style={{textAlign: "center", width: "100%"}}>Loading...</div>
    else {

      // TODO: More tabs (?)
      const {players, rosters} = details;

      const teamsWithPlayers = rosters.map(r => {
        const ps = players.filter(p => p.side === r.side);
        return {
          ...r,
          players: ps
        }
      });
      content = (
        <div className="MatchDetails-Overview">
          {
            teamsWithPlayers.map(team => {
              return <OverviewTeam key={team.gold} team={team} telemetry={telemetry}/>
            })
          }
        </div>
      )
    }
   

    return (
      <div className="MatchDetails animated slideInDown">
        {content}
      </div>
    )
  }
}

export default MatchDetails;