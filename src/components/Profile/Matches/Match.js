import React from "react";
import ReactGA from "react-ga";
import Box from "../../common/Box";

import {KDA, Rate} from "../../common/ColoredValues";
import AssetLoader from "../../common/AssetLoader";

import {Link} from "react-router-dom";

import Utils from "../../../utils";

import { Skeleton, SkeletonContainer } from "../../common/Skeleton";
import TimeAgo from "../../../i18n/timeAgo.js";

import MatchDetails from "./Details";

import "./Match.css";

// Polyfill Contains
function contains (node, other) {
  return node === other || !!(node.compareDocumentPosition(other) & 16);
}

const Loading = () => {
  return (
     <Box.wrap className={`PlayerMatch PlayerMatch-win`}>
        <Box.body className="PlayerMatch-body">
          <div className="PlayerMatch-Avatar" />
          <div className="PlayerMatch-Info">
            <h2><Skeleton width="50px" /></h2>
            <div className="MatchTime"><Skeleton width="60px" /></div>
            <div className="PlayerMatch-Info-KDA">
              <Skeleton width="70px" />
            </div>
            <div className="PlayerMatch-Info-KDA-text"><Skeleton width="80px" /></div>
          </div>
          <div className="PlayerMatch-Stats-Items">
            <div className="PlayerMatch-Stats">
              <div>
                <Skeleton width="85px" />
              </div>
              <div>
                <Skeleton width="80px" />
              </div>
            </div>

            <div className="PlayerMatch-Items">
                <div className="PlayerMatch-Item"/>
                <div className="PlayerMatch-Item"/>
                <div className="PlayerMatch-Item"/>
                <div className="PlayerMatch-Item"/>
                <div className="PlayerMatch-Item"/>
                <div className="PlayerMatch-Item"/>
            </div>
          </div>

          <div className="PlayerMatch-Players">
            <div className="PlayerMatch-Players-Team">
              <div><Skeleton width="80px" /> <Skeleton width="20px" height="20px" borderRadius="50%"/></div>
              <div><Skeleton width="80px" /> <Skeleton width="20px" height="20px" borderRadius="50%"/></div>
              <div><Skeleton width="80px" /> <Skeleton width="20px" height="20px" borderRadius="50%"/></div>
              <div><Skeleton width="80px" /> <Skeleton width="20px" height="20px" borderRadius="50%"/></div>
              <div><Skeleton width="80px" /> <Skeleton width="20px" height="20px" borderRadius="50%"/></div>
            </div>
            <div className="PlayerMatch-Players-Team">
              <div><Skeleton width="20px" height="20px" borderRadius="50%"/> <Skeleton width="80px" /></div>
              <div><Skeleton width="20px" height="20px" borderRadius="50%"/> <Skeleton width="80px" /></div>
              <div><Skeleton width="20px" height="20px" borderRadius="50%"/> <Skeleton width="80px" /></div>
              <div><Skeleton width="20px" height="20px" borderRadius="50%"/> <Skeleton width="80px" /></div>
              <div><Skeleton width="20px" height="20px" borderRadius="50%"/> <Skeleton width="80px" /></div>
            </div>
          

          </div>
        </Box.body>
      </Box.wrap>
  )
}

const PlayerTeam = ({player}) => (
  <div className="PlayerMatch-Players-Player">
    <AssetLoader type="heroes" name={player.hero} className="PlayerMatch-Players-Player-Hero" />
    <Link to={Utils.goToPlayer(player.name)}>{ (player.me) ? <b>{player.name}</b> : player.name }</Link>
  </div>
)

class Loaded extends React.PureComponent {

  state = {
    details: false
  } 
  
  handleOpen = (e) => {
    if (contains(this.avoid, e.target)) return;

    const {payload} = this.props;

    ReactGA.event({
      category: 'Players',
      action:   'Open Match Details',
      label:     payload.id,
    });

    this.setState((prevState) => ({details: !prevState.details}))
  }

  render() {
    const {payload} = this.props;
    const {id, shardId, minutes, ended, gameMode, players} = payload;

    let gM = gameMode.replace("Battle Royale", "BR");

    const me = players.find(p => p.me);

    let items = [];

    // In 5v5, HealingFlask and Vision Totems are default items. We don't need them.
    let itemsWithout5v5Default = me.items;
    if (gameMode.includes("5v5")) {
      itemsWithout5v5Default = me.items.filter(itemName => itemName !== "Vision Totem" && itemName !== "Healing Flask");
    }

    for (let i = 0; i < 6; i++) {
      let itemName;
      if (itemsWithout5v5Default[i]) {
        itemName = itemsWithout5v5Default[i];
      }

      items.push(<AssetLoader key={i} type="items" name={itemName} className="PlayerMatch-Item" />);
    }

    let blueSide = players.filter(p => p.side === "left/blue");
    let redSide = players.filter(p => p.side === "right/red");

    let winBadge = (
    <div className={`PlayerMatch-Status`}>
      {(me.winner && "Win") || "Loss"}
    </div>
    );

    return (
    <React.Fragment>
      <Box.wrap className={`PlayerMatch ${(me.winner && "PlayerMatch-win")}`}>
        <Box.body >
          <div className="PlayerMatch-body" onClick={this.handleOpen}>
            {winBadge}
            <AssetLoader type="heroes" name={me.hero} className="PlayerMatch-Avatar" >
              <div className="PlayerMatch-Avatar-Role" id={me.role.toLowerCase()}></div>
            </AssetLoader>
            
            <div className="PlayerMatch-Info">
              <div className="MatchTime MatchDuration">{minutes}</div>
              <h2>{gM}</h2>
              <div className="MatchTime"><TimeAgo date={ended} /></div>
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

            <div className="PlayerMatch-Players" ref={ref => this.avoid = ref}>
              
              <div className="PlayerMatch-Players-Team">
                {blueSide.map(player => <PlayerTeam key={player.id} player={player} />)}
              </div>
              <div className="PlayerMatch-Players-Team">
                {redSide.map(player => <PlayerTeam key={player.id} player={player} />)}
              </div>
            </div>
          </div>
        </Box.body>
      </Box.wrap>
      {this.state.details && <MatchDetails matchId={id} region={shardId} playerName={me.name} gameMode={gameMode}/>}
    </React.Fragment>
    )

  }
}

const Match = SkeletonContainer(Loading, Loaded);

export default Match;