import React from "react";

import "./HeroesPlayed.css";

const Heroes2 = ({t}) => (
  <div className="champions">
    <div className="hero_each" data-hero="' + key.toLowerCase() + '">
    <div className="hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>
    <div className="hero_name">Adagio</div>
    <div className="hero_kda">
      <span data-tooltip="Avg. CS per game">14 CS</span>
      <span className="kda" data-tooltip="(1 K + 3 A) / 2 D"> 2.5 {t("kda")}</span></div>
      <div className="hero_winrate" id="d" data-tooltip="' + hero.totalVictory + 'W ' + hero.totalLoss + ' L" >15%</div>
      <div className="hero_games">124 {t("sidebar-played")}</div></div>
  </div>
);

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