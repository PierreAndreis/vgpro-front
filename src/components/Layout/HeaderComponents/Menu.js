import React from "react";

import { translate } from "react-i18next";

import { NavLink } from "react-router-dom";
import Media from "react-media";

// import "./Menu.css";
import * as Styled from "./Menu.style.js";
// import ThemeSwitch from "./ThemeSwitch";

const NavLinks = [
  {
    name: "Home",
    loc: "feature.Home",
    to: "/",
    exact: true,
  },
  {
    name: "Leaderboard",
    loc: "feature.Leaderboard",
    to: "/leaderboard",
  },
  {
    name: "Heroes",
    loc: "feature.Heroes",
    to: "/heroes",
  },
];

const MenuList = translate()(({ t }) => {
  return (
    <React.Fragment>
      {NavLinks.map(nav => (
        <NavLink
          key={nav.name}
          to={nav.to}
          exact={nav.exact}
          activeClassName={nav.soon ? "" : "active"}
        >
          {nav.loc ? t(nav.loc) : nav.name}{" "}
        </NavLink>
      ))}
      <a
        href="https://prime.vgpro.gg"
        target="_blank"
        rel="noopener noreferrer"
      >
        VGPRIME <span>NEW!</span>
      </a>
    </React.Fragment>
  );
});

class MenuMobile extends React.Component {
  state = { open: false };

  handleMenu = () => {
    this.setState(prevState => {
      return {
        open: !prevState.open,
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Styled.MobileButton>
          <Styled.MobileIcon
            open={this.state.open}
            onClick={this.handleMenu}
          >
            <span />
          </Styled.MobileIcon>
        </Styled.MobileButton>

        <Styled.MenuMobile
          open={this.state.open}
          onClick={this.handleMenu}
        >
          <MenuList />
          {/* <Styled.MenuMobileBottom>
            <ThemeSwitch text />
          </Styled.MenuMobileBottom> */}
        </Styled.MenuMobile>
      </React.Fragment>
    );
  }
}

const MenuDesktop = props => (
  <Styled.MenuDesktop>
    <MenuList {...props} />
  </Styled.MenuDesktop>
);

const MenuHeader = props => {
  /** Please, keep this MediaQuery updated with Header.css **/
  return (
    <Media query="(max-width: 768px)">
      {matches =>
        matches ? <MenuMobile {...props} /> : <MenuDesktop {...props} />
      }
    </Media>
  );
};

export default MenuHeader;
