import React from "react";

import "./MatchDetails.css";


const OverviewPlayer = () => (
  <React.Fragment>
    <div className="Overview-Player-Info">
      <div className="Overview-Player-Image">
        <div className="OverView-Player-Image-Hero" style={{
                backgroundImage: `url(http://vgpro.gg/assets/images/heroes/catherine.gif)`
            }}>
          <div className="Overview-Player-Image-Role" id="captain" />
        </div>
      </div>
      <div className="Overview-Player-Info-details">
        <div className="Overview-Player-Info-Name">StartingAllOver</div>
        <div className="Overview-Player-Info-KDA">
          <span>3</span> / <span className="d">2</span> / <span>10</span>
          <div>2.43 KDA</div>
        </div>
      </div>
    </div>
    <div className="Overview-Player-Items">
      <div className="Overview-Player-Item" style={{backgroundImage: `url(http://vgpro.gg/assets/images/items/crucible.png)`}}/>
      <div className="Overview-Player-Item" style={{backgroundImage: `url(http://vgpro.gg/assets/images/items/crucible.png)`}}/>
      <div className="Overview-Player-Item" style={{backgroundImage: `url(http://vgpro.gg/assets/images/items/crucible.png)`}}/>
      <div className="Overview-Player-Item" style={{backgroundImage: `url(http://vgpro.gg/assets/images/items/crucible.png)`}}/>
      <div className="Overview-Player-Item" style={{backgroundImage: `url(http://vgpro.gg/assets/images/items/crucible.png)`}}/>
      <div className="Overview-Player-Item" style={{backgroundImage: `url(http://vgpro.gg/assets/images/items/crucible.png)`}}/>
    </div>
    <div className="Overview-Player-Stats">

      <div className="Overview-Player-Stats-Game">
        <div className="Overview-Player-CS">32</div>
        <div className="Overview-Player-Gold">35k</div>
      </div>

      <div className="Overview-Player-Damage">
        <div className="Overview-Player-Damage-bar">
          <div className="Overview-Player-Damage-fill" style={{width: "54%"}} />
        </div>
        <div className="Overview-Player-Damage-label"> 63k </div>
      </div>

    </div>
    <div className="Overview-Player-Rank">
      <div className="Overview-Player-Tier" style={{backgroundImage: `url(http://vgpro.gg/assets/images/skilltier/30.png`}} />
    </div>
  </React.Fragment>
);

const OverViewTeam = () => (
   <div className="Overview-Team">
            <div className="Overview-Cell Overview-Header">
              <div className="Overview-Player-Info">
                WIN Blue team
              </div>
              <div className="Overview-Player-Items">Items</div>
              <div className="Overview-Player-Stats">Stats & Damage</div>
              <div className="Overview-Player-Rank">Rank</div>
            </div>
            <div className="Overview-Cell Overview-Player">
              <OverviewPlayer />
            </div>
            <div className="Overview-Cell Overview-Player">
              <OverviewPlayer />
            </div>
            <div className="Overview-Cell Overview-Player">
              <OverviewPlayer />
            </div>

          </div>
)


class MatchDetails extends React.Component{

  render() {
    return (
      <div className="MatchDetails">
      
        <div className="MatchDetails-Overview">
          <OverViewTeam />
          <OverViewTeam />
        </div>
      </div>
    )
  }
}

export default MatchDetails;