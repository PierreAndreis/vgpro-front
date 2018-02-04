import React from "react";

import Box                from "./../../common/Box";
import AssetLoader        from "./../../common/AssetLoader";
import ErrorScreen        from "../../common/ErrorScreen";
import {KDA, Rate}        from "../../common/ColoredValues";
import {Skeleton,  
        SkeletonContainer, 
        SkeletonPayload}  from "../../common/Skeleton";

import Utils from "./../../../utils";

import "./HeroesPlayed.css";

const HEROES_PER_PAGE = 4;

function compare(a,b) {
  if (a.games < b.games)
    return 1;
  if (a.games > b.games)
    return -1;
  return 0;
}

const Loaded = ({data}) => {
  const {
    name,
    kda,
    games,
    winRate,
    avgKills,
    avgDeaths,
    avgAssists,
    avgCS,
  } = data;

  let kills = avgKills.toFixed(0);
  let deaths = avgDeaths.toFixed(0);
  let assists = avgAssists.toFixed(0);

  return (
  <div className="PlayerHero">

    <AssetLoader type="heroes" name={name} className="PlayerHero-Image" />
    <div className="PlayerHero-Info">
      <div className="PlayerHero-Name">{name}</div>
      <div className="PlayerHero-cs">{avgCS} cs</div>
    </div>
    <div className="PlayerHero-Stats">
      <div className="PlayerHero-KDA">
        <KDA kda={kda} /> KDA
      </div>
      <div className="PlayerHero-KDA-details">
      <span>{kills}</span>/<span id="deaths">{deaths}</span>/<span>{assists}</span>
      </div>
    </div>
    <div className="PlayerHero-WR">
      <div className="PlayerHero-WR-value"><Rate rate={winRate} /></div>
      <div className="PlayerHero-WR-desc">{games} played</div>
    </div>
  </div>
  )
}

const Loading = () => (
  <div className="PlayerHero skeletonDiv">
    <Skeleton width="40px" height="40px" borderRadius="50%" />
    <div className="PlayerHero-Info">
      <div className="PlayerHero-Name"><Skeleton width="40px" height="15px"/></div>
      <div className="PlayerHero-cs"><Skeleton width="30px" height="10px"/></div>
    </div>
    <div className="PlayerHero-Stats">
      <div className="PlayerHero-KDA"><Skeleton width="50px" height="15px"/></div>
      <div className="PlayerHero-KDA-details">
      <Skeleton width="80px" height="15px"/>
      </div>
    </div>
    <div className="PlayerHero-WR">
      <div className="PlayerHero-WR-value"><Skeleton width="60px" height="20px"/></div>
      <div className="PlayerHero-WR-desc"><Skeleton width="30px" height="15px"/></div>
    </div>
  </div>
)

const Hero = SkeletonContainer(Loading, Loaded);

class HeroesPlayed extends React.PureComponent {

  state = {
    page: 1,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.status === "loading") return this.setState({page: 1});
  }

  paginateUp(e) {
    if (e.target.id === "disabled") return;
    
    this.setState({
      page: this.state.page + 1
    })
  }

  paginateDown(e) {
    if (   e.target.id === "disabled"
        || this.state.page < 2) return;
    this.setState({
      page: this.state.page - 1
    })
  }

  render() {
    const {status, data} = this.props;
    const {page} = this.state;

    let payload;
    let content = [];
    let lastPage;

    if (status === "loaded" && (data && data.stats && data.stats.Heroes)) {

      let heroes = data.stats.Heroes;
      heroes = heroes.sort(compare);

      const itemPerPage = HEROES_PER_PAGE;
      lastPage = (heroes) ? (heroes.length / itemPerPage) : 1;

      payload = Utils.paginateArray(heroes, HEROES_PER_PAGE, page);
    }
    else if (status === "loading") {
      payload = SkeletonPayload(HEROES_PER_PAGE);
    }
    else {
      return <ErrorScreen />;
    }

    payload.forEach((hero, index) => {
      content.push(<Hero key={index} status={status} data={hero} />);
    });

    return (
    <React.Fragment>
      <div className="PlayerHeroes">
        {content}
      </div>
      <Box.action>
        <div className="button" 
             id={(page > 1       ) ? "" : "disabled"}  
             onClick={this.paginateDown.bind(this)}
             >Back</div>
        <div className="button" 
            id={(page < lastPage) ? "" : "disabled"} 
            onClick={this.paginateUp.bind(this) } 
            >Next</div>
      </Box.action>
    </React.Fragment>
    )
  }
}



export default HeroesPlayed;