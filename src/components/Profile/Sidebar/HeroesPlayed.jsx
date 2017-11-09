import React from "react";

const HeroesPlayed = ({t}) => (
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

export default HeroesPlayed;