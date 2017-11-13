import React from "react";

import "./HeroesPlayed.css";

const Hero = () => (
  <div className="PlayerHero">
    <div className="PlayerHero-Image" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}} />
    <div className="PlayerHero-Info">
      <div className="PlayerHero-Name">Vox</div>
      <div className="PlayerHero-cs">25 cs</div>
    </div>
    <div className="PlayerHero-Stats">
      <div className="PlayerHero-KDA">2.61 KDA</div>
      <div className="PlayerHero-KDA-details">
      <span>1</span>/<span id="deaths">2</span>/<span>32</span>
      </div>
    </div>
    <div className="PlayerHero-WR">
      <div className="PlayerHero-WR-value">32%</div>
      <div className="PlayerHero-WR-desc">32 played</div>
    </div>
  </div>
)

const HeroesPlayed = () => (
  <div className="PlayerHeroes">
    <Hero/>
    <Hero/>
    <Hero/>
    <Hero/>
  </div>
)

export default HeroesPlayed;