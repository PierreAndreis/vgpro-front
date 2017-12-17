import React from "react";

import Box from "../../common/Box";

import { connect }          from "react-redux";

import PlayerInfo       from "./PlayerInfo";
import HeroesPlayed     from "./HeroesPlayed";
import RecentRoles      from "./RecentRoles";
import RecentPlayedWith from "./RecentPlayedWith";
 

const SideBarItems = [
  {
    componentBody: PlayerInfo
  },
  {
    label: "Recent Roles",
    labelKey: "recent-roles",
    componentBody: RecentRoles
  },
  {
    label: "Most Played Heroes",
    labelKey: "most-played-heroes",
    componentBody: HeroesPlayed
  },
  {
    label: "Most Played Heroes",
    labelKey: "recent-played-with",
    componentBody: RecentPlayedWith,
  }
]

class Sidebar extends React.Component {
  render() {
    const {t, status, playerStats} = this.props;

    let propsPass = {
      t,
      status,
      data: playerStats
    }

    const components = SideBarItems.map((item, index) => {
      const ComponentBody = item.componentBody;

      return (
        <Box.wrap key={index} className="ProfileSidebar-box">
          {(item.label || item.labelKey) && <Box.title>{(item.labelKey) ? t(item.labelKey) : item.label}</Box.title>}
          <Box.body> <ComponentBody {...propsPass} /></Box.body>
        </Box.wrap>
      )
    })



    return (
      <div className="Profile__Sidebar">
        {components}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.playerStats
  }
}

export default connect(
  mapStateToProps
)(Sidebar);