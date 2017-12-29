import React from "react";

import {translate} from "react-i18next";

import Utils from "utils";
import { Link }   from 'react-router-dom';
import {Skeleton, SkeletonContainer} from "../../common/Skeleton";


const Loading = () => {
  return (
      <div className="ProFeed-each skeletonDiv" >
        <div className="ProFeed-each-status" />
        <div className="ProFeed-each-info">
          <Skeleton width={30} height={30}/>
          <div className="ProFeed-each-info-personal">
            <Skeleton width={50} height={10}/>
            <span><Skeleton width={40} height={5}/></span>
          </div>
        </div>
        <div className="ProFeed-each-game">
          <Skeleton width={25} height={25} borderRadius={"50%"}/>
          <div className="ProFeed-each-game-kda">
            <Skeleton width={25} height={10}/>
          </div>
          
        </div>
        <div className="ProFeed-each-items">
          <Skeleton width={20} height={20} borderRadius={"50%"}/>
          <Skeleton width={20} height={20} borderRadius={"50%"}/>
          <Skeleton width={20} height={20} borderRadius={"50%"}/>
          <Skeleton width={20} height={20} borderRadius={"50%"}/>
          <Skeleton width={20} height={20} borderRadius={"50%"}/>
          <Skeleton width={20} height={20} borderRadius={"50%"}/>
        </div>
        <div className="ProFeed-each-arrow"> <i className="fa fa-angle-right" /> </div>
      </div>
  )
}

const Loaded = ({t, data, style}) => {


  //   "createdAt": "2017-11-04T20:28:56Z",
  //   "matchId": "c0b9d250-c19e-11e7-8607-0671096b3e30",
  //   "proInfo": {
  //     "name": "iLoveJoseph",
  //     "position": "jungler",
  //     "region": "na",
  //     "team": "Cloud9"
  //   },
  //   "actor": "Reza",
  //   "tier": 28,
  //   "winner": true,
  //   "kills": 6,
  //   "deaths": 5,
  //   "assists": 5,
  //   "items": Array[6][
  //     "Broken Myth",
  //     "Aftershock",
  //     "Metal Jacket",
  //     "Heavy Prism",
  //     "Reflex Block",
  //     "Travel Boots"
  //   ]
  // },


  const {
    proInfo, 
    actor, 
    winner, 
    kills,
    role,
    deaths,
    assists,
    items,
  } = data;
  
  const {name, region, team} = proInfo;

  const win = (winner) ? "Win" : "Loss";

  const itemsImage = [];

  for (let i = 0; i < 6; i++) {
    
    let style;
    if (items[i]) {
      const name = items[i].replace(/([ ])+/g, "-").toLowerCase();
      style = {
        backgroundImage: `url(http://vgpro.gg/assets/images/items/${name}.png)`
      }
    }

    itemsImage.push(
      <div
        key={i}
        className="ProFeed-each-items-each"
        style={style}/>);
  }

  return (
  <Link to={Utils.goToPlayer(name)} className="ProFeed-each animated fadeIn" style={style}>
    <div className="ProFeed-each-status" id={win}/>
    <div className="ProFeed-each-info">
      <div className="ProFeed-each-info-picture" style={{
        backgroundImage: `url(/players/${name}.png)`
      }} />
      <div className="ProFeed-each-info-personal">
        <div>{name} {" "}<span>{region}</span></div>
        <span>{team}</span>
      </div>
    </div>
    <div className="ProFeed-each-game">
      <div className="ProFeed-each-game-hero" style={{
      backgroundImage: `url(http://vgpro.gg/assets/images/heroes/${actor.toLowerCase()}.gif)`
    }} ><div className="ProFeed-each-game-role" id={role && role.toLowerCase()} /></div>
      <div className="ProFeed-each-game-kda">{kills}/{deaths}/{assists}</div>
      
    </div>
    <div className="ProFeed-each-items">
      {itemsImage}
    </div>
    <div className="ProFeed-each-arrow"> <i className="fa fa-angle-right" /> </div>
  </Link>
  )

}

const FeedMatch = SkeletonContainer(Loading, Loaded);

export default translate()(FeedMatch);