import React from "react";

import LanguageSelector from "./Header/LanguageSelector";
import SearchPlayer from "./../common/SearchPlayer";
import {NavLink} from "react-router-dom";

import "./Sidebar.css";

const NavLinks = [
  {
    name: "Home",
    label:  "home",
    to:   "/",
    exact: true,
  },
  {
    name: "Leaderboard",
    label:  "leaderboard",
    to:   "/leaderboard",
  },
  {
    name: "Teams",
    label:  "teams",
    to:   "/teams",
  },
  {
    name: "Heroes",
    label:  "heroes",
    to:   "/",
    soon: true,
  },
  {
    name: "News",
    label:  "news",
    to:   "/",
    soon: true,
  },
  {
    name: "Esports",
    label:  "vg8",
    to:   "/",
    soon: true,
  },
];

class Sidebar extends React.Component {
  render() {
    return (
      <div className="Sidebar">
        <div className="Sidebar-VGPRO-logo" />
        <div className="Sidebar-Search">
          <div className="Sidebar-Search-Icon fa fa-search">
          </div>
        </div>


        <div className="Sidebar-Menu">
          {NavLinks.map(nav => (
            <NavLink 
              key={nav.name}
              to={nav.to} 
              exact={nav.exact} 
              className="Sidebar-Menu-Item"
              activeClassName={nav.soon ? "" : "active"}
            >
              <div className={`Menu-Item-icon icon-${nav.label}`} />
              <span>{nav.name}</span>
            </NavLink>
          ))}
        </div>
        <div className="Sidebar-localization">
          <LanguageSelector />
        </div>
      </div>
    );
  }
}

export default Sidebar;