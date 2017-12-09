import React from "react";
import Box from "../../common/Box";

import {KDA, Rate} from "../../common/ColoredValues";

import {Link} from "react-router-dom";

import Utils from "../../../utils";

import { SkeletonContainer } from "../../common/Skeleton";
import TimeAgo from "../../../i18n/timeAgo.js";

import "./Match.css";

const Loading = () => {
  return (
    <p>Loading</p>
  )
}

const PlayerTeam = ({player}) => (
  <div className="PlayerMatch-Players-Player">
    <div className="PlayerMatch-Players-Player-Hero" style={{
      backgroundImage: `url(http://vgpro.gg/assets/images/heroes/${player.hero.toLowerCase()}.gif)`
  }} />
    <Link to={Utils.goToPlayer(player.name)}>{ (player.me) ? <b>{player.name}</b> : player.name }</Link>
  </div>
)

class Loaded extends React.Component {
  render() {
    const {payload} = this.props;
    const {minutes, ended, gameMode, players} = payload;

    let gM = gameMode.replace("Battle Royale", "BR");

    const me = players.find(p => p.me);

    let items = [];

    for (let i = 0; i < 6; i++) {
      let style;
      if (me.items[i]) {
        const name = me.items[i].replace(/([ ])+/g, "-").replace("'", "").toLowerCase();
        style = {
          backgroundImage: `url(http://vgpro.gg/assets/images/items/${name}.png)`
        }
      }

      items.push(<div key={i} className="PlayerMatch-Item" style={style}/>);
    }

    let blueSide = players.filter(p => p.side === "left/blue");
    let redSide = players.filter(p => p.side === "right/red");

    let winBadge = (
    <div className={`PlayerMatch-Status`}>
      {(me.winner && "Win") || "Loss"}
    </div>
    );

    return (
      <Box.wrap className={`PlayerMatch ${(me.winner && "PlayerMatch-win")}`}>
        <Box.body className="PlayerMatch-body">
          <div className="PlayerMatch-Avatar" style={{
              backgroundImage: `url(http://vgpro.gg/assets/images/heroes/${me.hero.toLowerCase()}.gif)`
          }}>
            <div className="PlayerMatch-Avatar-Role" id={me.role.toLowerCase()}></div>
          </div>
          
          <div className="PlayerMatch-Info">
            <h2>{gM}</h2>
            <div className="MatchTime"><TimeAgo date={ended} /> - {minutes}</div>
            <div className="PlayerMatch-Info-KDA">
              <span className="k">{me.kills}</span> / <span className="death">{me.deaths}</span> / <span className="k">{me.assists}</span>
            </div>
            <div className="PlayerMatch-Info-KDA-text"><KDA kda={me.kda} /> KDA</div>
          </div>
          <div className="PlayerMatch-Stats-Items">
            <div className="PlayerMatch-Stats">
              <div className="PlayerMatch-Stats-Gold">
                <div>{Utils.minifyNumber(me.gold)}</div>
                (<Rate rate={me.goldShare} /> share)
              </div>
              <div className="PlayerMatch-Stats-CS">
                <div>{me.cs} cs</div>
                ({me.csMin} cs/min)
              </div>
            </div>

            <div className="PlayerMatch-Items">
              {
                items
              }
            </div>
          </div>

          <div className="PlayerMatch-Players">
            
            <div className="PlayerMatch-Players-Team">
              {blueSide.map(player => <PlayerTeam key={player.id} player={player} />)}
            </div>
            <div className="PlayerMatch-Players-Team">
              {redSide.map(player => <PlayerTeam key={player.id} player={player} />)}
            </div>
          </div>
            {winBadge}
        </Box.body>
      </Box.wrap>
    )

  }
}

const Match = SkeletonContainer(Loading, Loaded);

export default Match;