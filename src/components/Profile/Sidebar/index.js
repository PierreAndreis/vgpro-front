import React from "react";

import Box from "../../common/Box";

import { connect }          from "react-redux";

import AsyncContainer from "./../../common/AsyncContainer";

const SideBarItems = [
  {
    componentBody: AsyncContainer(() => import("./PlayerInfo")),
    className: "PlayerInfo-Box"
  },
  {
    label: "Recent Roles",
    labelKey: "recent-roles",
    componentBody: AsyncContainer(() => import("./RecentRoles"))
  },
  {
    label: "Most Played Heroes",
    labelKey: "most-played-heroes",
    componentBody: AsyncContainer(() => import("./HeroesPlayed"))
  },
  {
    label: "Played with",
    componentBody: AsyncContainer(() => import("./RecentPlayedWith")),
  }
]

class Sidebar extends React.Component {
  render() {
    const {t, status, playerStats} = this.props;

    let propsPass = {
      t,
      status,
      data: playerStats,
    }

    const components = SideBarItems.map((item, index) => {
      const ComponentBody = item.componentBody;

      return (
        <Box.wrap key={index} className={`ProfileSidebar-box ${item.className ? item.className : ""}`}>
          {(item.label || item.labelKey) && <Box.title>{(item.labelKey) ? t(item.labelKey) : item.label}</Box.title>}
          <Box.body> <ComponentBody {...propsPass} /></Box.body>
        </Box.wrap>
      )
    })



    return (
      <React.Fragment>
        {components}
      </React.Fragment>
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