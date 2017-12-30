import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom';
import ReactGA  from "react-ga";


import { translate } from 'react-i18next';

import AsyncContainer from "./common/AsyncContainer";

const HomePage    = AsyncContainer(() => import("./Home/Home"));
const Profile     = AsyncContainer(() =>  import('./Profile/Profile'));

// const Teams       = AsyncContainer(() =>  import('./Teams/Teams'));
// const Leaderboard = AsyncContainer(() =>  import('./Leaderboard/Leaderboard'));

const Teams       = AsyncContainer(() =>  import('./common/Soon'));
const Leaderboard = AsyncContainer(() =>  import('./common/Soon'));
const Heroes      = AsyncContainer(() =>  import('./common/Soon'));

// then our route config
const routes = [
  {
    path: '/players/:player',
    component: Profile,
  },
  { 
    path: '/teams',
    component: Teams
  },
  {
    path: '/leaderboard',
    component: Leaderboard,
  },
  {
    path: '/heroes',
    component: Heroes,
  },
  {
    path: '/',
    component: HomePage,
  },
  
].map(router => {
  // yoock, we are adding translate to all routers
  // Later on, I will add a container which will do the job nicely.
  return {
    ...router,
    component: translate()(router.component)
  }
})




// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} exact={route.exact} render={props => {
    // pass the sub-routes down to keep nesting
    ReactGA.pageview(props.location.pathname);
    return (<route.component {...props} routes={route.routes}/>);
  }}/>
)

const Routers = () => (
  <div>
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </Switch>
  </div>
)

export default Routers;