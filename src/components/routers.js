import React from "react";
import { Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";

import { translate } from "react-i18next";

import AsyncContainer from "./common/AsyncContainer";

import HomePage from "./Home/Home";
const Profile = AsyncContainer(() => import("./Profile/Profile"));
const Match = AsyncContainer(() => import("./Matches/Match"));
// const Teams       = AsyncContainer(() =>  import('./common/Soon')               );
const Leaderboard = AsyncContainer(() =>
  import("./Leaderboard/Leaderboard.js")
);
const Heroes = AsyncContainer(() => import("./Heroes"));
const HeroPage = AsyncContainer(() => import("./Heroes/Details"));

// then our route config
const routes = [
  {
    path: "/players/:region/:player",
    component: Profile,
  },
  {
    path: "/match/:region/:matchId/:player?",
    component: Match,
  },
  {
    path: "/players/:player",
    // We use player as "key" to make it reset whenever the player is changed
    component: props => (
      <Profile key={props.match.params.player} {...props} />
    ),
  },
  {
    path: "/leaderboard",
    component: Leaderboard,
  },
  {
    path: "/heroes/:heroName/:tab?",
    component: HeroPage,
  },
  {
    path: "/heroes",
    component: Heroes,
  },
  {
    path: "/",
    component: HomePage,
  },
].map(router => {
  // yoock, we are adding translate to all routers
  // Later on, I will add a container which will do the job nicely.
  return {
    ...router,
    component: translate()(router.component),
  };
});

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => {
      // pass the sub-routes down to keep nesting
      ReactGA.pageview(props.location.pathname);
      return <route.component {...props} routes={route.routes} />;
    }}
  />
);

const Routers = () => (
  <div>
    <Switch>
      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>
  </div>
);

export default Routers;
