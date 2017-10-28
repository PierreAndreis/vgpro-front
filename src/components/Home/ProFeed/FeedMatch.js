import React from "react";

import {translate} from "react-i18next";

import Utils from "utils";
import { Link }   from 'react-router-dom';

const FeedMatch = ({t, data, style}) => {

  const {
    ign, 
    region, 
    ProfilePic, 
    actor, 
    winner, 
    kills,
    deaths,
    assists,
    Items,
    Team,
    role
  } = data;

  // Uhh... Why is this a string?
  const win = (winner !== "0") ? "Win" : "Loss";

  const items = [];

  for (let i = 0; i < 6; i++) {
    
    let style;

    if (Items && Items[i]) {
      style = {
        backgroundImage: `url(http://vgpro.gg/assets/images/items/${Items[i]}.png)`
      }
    }

    items.push(
      <div
        key={i}
        className="ProFeed-each-items-each"
        style={style}/>);
  }

  return (
  <Link to={Utils.goToPlayer(ign)} className="ProFeed-each" style={style}>
    <div className="ProFeed-each-status" id={win}/>
    <div className="ProFeed-each-info">
      <div className="ProFeed-each-info-picture" style={{
        backgroundImage: `url(http://vgpro.gg/assets/${ProfilePic})`
      }} />
      <div className="ProFeed-each-info-personal">
        <div>{ign} {" "}<span>{region}</span></div>
        <span>{Team.name}</span>
      </div>
    </div>
    <div className="ProFeed-each-game">
      <div className="ProFeed-each-game-hero" style={{
      backgroundImage: `url(http://vgpro.gg/assets/images/heroes/${actor}.gif)`
    }} ><div className="ProFeed-each-game-role" id={role} /></div>
      <div className="ProFeed-each-game-kda">{kills}/{deaths}/{assists}</div>
      
    </div>
    <div className="ProFeed-each-items">
      {items}
    </div>
    <div className="ProFeed-each-arrow"> <i className="fa fa-angle-right" /> </div>
  </Link>
  )

}

export default translate()(FeedMatch);