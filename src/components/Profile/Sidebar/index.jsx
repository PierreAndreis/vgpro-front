import React from "react";

import Box from "../../common/Box";

// import VPR              from "./VPR";
import HeroesPlayed     from "./HeroesPlayed";
import RecentRoles      from "./RecentRoles";
import RecentPlayedWith from "./RecentPlayedWith";
 

const SideBarItems = [
  {
    label: "Most Played Heroes",
    labelKey: "most-played-heroes",
    componentBody: HeroesPlayed
  },
  // {
  //   label: "VPR",
  //   labelKey: "ratings",
  //   componentBody: VPR
  // },
  {
    label: "Recent Roles",
    labelKey: "recent-roles",
    componentBody: RecentRoles
  },
  {
    label: "Most Played Heroes",
    labelKey: "recent-played-with",
    componentBody: RecentPlayedWith,
  }
]

class Sidebar extends React.Component {
  render() {
    const {t} = this.props;

    const components = SideBarItems.map(item => {
      const ComponentBody = item.componentBody;

      return (
        <Box.wrap className="ProfileSidebar-box">
          <Box.title>{(item.labelKey) ? t(item.labelKey) : item.label}</Box.title>
          <Box.body> <ComponentBody t={t} /></Box.body>
        </Box.wrap>
      )
    })



    return (
      <div className="sidebar">
      {components}
    </div>
    )
  }
}

export default Sidebar;