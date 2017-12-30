import React from "react";

import {translate} from "react-i18next";

import { NavLink }       from 'react-router-dom';
import Media             from "react-media";

import "./Menu.css";

const NavLinks = [
  {
    name: "Home",
    loc:  "menuhome",
    to:   "/",
    exact: true,
  },
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
    to:   "/heroes",
  },
]


const m = ({t}) => { 
  return (
    <React.Fragment>
      {NavLinks.map(nav => (
        <NavLink key={nav.name}
                 to={nav.to} 
                 exact={nav.exact} 
                 activeClassName={nav.soon ? "" : "active"}
        >{nav.loc ? t(nav.loc) : nav.name} </NavLink>
      ))}
    </React.Fragment>
  );
}

const Menu = translate()(m);


class MobileMenu extends React.Component{

  state = {open: false}

  handleMenu = () => {
    this.setState((prevState) => {
      return {
        open: !prevState.open
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="Menu-Mobile-Area">
          <div className={
            `Menu-Mobile-Button 
            fa ${this.state.open ? "fa-close" : "fa-bars"}`} 
            onClick={this.handleMenu}/>
        </div>

        <div className={`Mobile-Menu ${this.state.open && "menu-open"}`} onClick={this.handleMenu}>
          <Menu />
        </div>

      </React.Fragment>
    )
  }

}


const MenuHeader = (props) => {

  /** Please, keep this MediaQuery updated with Header.css **/
  return (
      <Media query="(max-width: 768px)">
        {matches =>
          matches ? (
            <MobileMenu {...props} />
          ) : (
            <div className="Header-Menu">
              <Menu {...props} />
            </div>
          )
        }
      </Media>
  )
}

export default MenuHeader;