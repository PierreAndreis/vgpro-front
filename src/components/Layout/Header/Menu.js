import React from "react";

import { NavLink }       from 'react-router-dom';
import Media             from "react-media";

import "./Menu.css";

const NavLinks = [
  // {
  //   name: "Home",
  //   loc:  "menuhome",
  //   to:   "/",
  //   exact: true,
  // },
  {
    name: "Leaderboard",
    loc:  "leadboard",
    to:   "/leaderboard",
  },
  {
    name: "Teams",
    loc:  "menuteams",
    to:   "/teams",
  },
  {
    name: "Heroes",
    loc:  "menuheroes",
    to:   "/",
    soon: true,
  },
]


const DesktopMenu = ({t}) => { 
  return (
    <div className="Header-Menu">
      {NavLinks.map(nav => (
        <NavLink key={nav.name}
                 to={nav.to} 
                 exact={nav.exact} 
                 activeClassName={nav.soon ? "" : "active"}
        >{nav.loc ? t(nav.loc) : nav.name} </NavLink>
      ))}
    </div>
  );
}


const MenuHeader = (props) => {

  /** Please, keep this MediaQuery updated with Header.css **/
  return (
      <Media query="(max-width: 768px)">
        {matches =>
          matches ? (
            <i className="fa fa-bars" />
          ) : (
            <DesktopMenu {...props} />
          )
        }
      </Media>
  )
}

export default MenuHeader;