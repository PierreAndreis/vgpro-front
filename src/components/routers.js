import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom';

import { translate } from 'react-i18next';

import HomePage    from './Home/Home';
import Teams       from './Teams/Teams';
import Profile     from './Profile/Profile';
import Leaderboard from './Leaderboard/Leaderboard';

// then our route config
const routes = [
  { 
    path: '/teams',
    component: Teams
  },
  {
    path: '/players/:player',
    component: Profile,
  },
  {
    path: '/leaderboard',
    component: Leaderboard,
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
  <Route path={route.path} exact={route.exact} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
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