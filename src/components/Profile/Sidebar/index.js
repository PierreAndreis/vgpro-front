import React from "react";

import { connect }          from "react-redux";

import PlayerInfo from "./PlayerInfo";
import HeroesPlayed from "./HeroesPlayed";
import RecentRoles from "./RecentRoles";
import Friends from "./Friends";

const SideBarItems = [
  {
    componentBody: PlayerInfo,
    className: "PlayerInfo-Box"
  },
  {
    label: "Most Played Heroes",
    labelKey: "most-played-heroes",
    componentBody: HeroesPlayed
  },
  {
    label: "Recent Roles",
    labelKey: "recent-roles",
    componentBody: RecentRoles,
  },
  {
    label: "Played with",
    componentBody: Friends,
  }
]

class Sidebar extends React.Component {
  render() {
    const {t, status, player} = this.props;

    let propsPass = {
      t,
      status,
      data: player,
    }

    const components = SideBarItems.map((item, index) => {
      const ComponentBody = item.componentBody;

      return (<ComponentBody key={index} {...propsPass} />)
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