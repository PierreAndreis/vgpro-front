import React from "react";

import {translate} from "react-i18next";


const FeedMatch = ({t, data}) => {

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
    Team
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
    <a href="" className="ProFeed-each">
    <div className="ProFeed-each-status" id={win}/>
    <div className="ProFeed-each-info">
      <div className="ProFeed-each-info-picture" style={{
         backgroundImage: `url(http://vgpro.gg/assets/${ProfilePic})`
      }} />
      <div className="ProFeed-each-info-personal">
        <div>{ign}</div>
        <span>{Team.name}</span>
      </div>
      <div className="ProFeed-each-info-region">
        <span>{region}</span>
      </div>
    </div>
    <div className="ProFeed-each-game">
      <div className="ProFeed-each-game-hero" style={{
      backgroundImage: `url(http://vgpro.gg/assets/images/heroes/${actor}.gif)`
    }} />
      <div className="ProFeed-each-game-kda">{kills}/{deaths}/{assists}</div>
      <div className="ProFeed-each-game-role" id="carry" />
    </div>
    <div className="ProFeed-each-items">
      {items}
    </div>
    <div className="ProFeed-each-arrow"> <i className="fa fa-angle-right" /> </div>
  </a>
  )

}

export default translate()(FeedMatch);