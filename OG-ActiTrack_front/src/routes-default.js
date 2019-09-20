import React from 'react';
import {RoutesEndpoint} from "./utils/RoutesEndpoint";
import EAuthRole from "./utils/auth/EAuthRole";

const Home = React.lazy(() => import('./views/view/default/Home'));
const Dashboard = React.lazy(() => import('./views/view/default/Dashboard'));
const PlayerActivity = React.lazy(() => import('./views/view/default/PlayerActivity/PlayerActivity'));
const GalaxyActivity = React.lazy(() => import('./views/view/default/GalaxyActivity'));
const AccountLayout = React.lazy(() => import('./views/containers/AccountLayout'));

const routes = [
  { path: RoutesEndpoint.HOME, exact: true, name: 'Home', component: Home, restricted: EAuthRole.NONE },
  { path: RoutesEndpoint.DASHBOARD, exact: true, name: 'Dashboard', component: Dashboard, restricted: EAuthRole.BASIC },
  { path: RoutesEndpoint.PLAYER_Activity, exact: true, name: 'Player Activity', component: PlayerActivity, restricted: EAuthRole.BASIC },
  { path: RoutesEndpoint.PLAYER_Galaxy, exact: true, name: 'Galaxy Activity', component: GalaxyActivity, restricted: EAuthRole.BASIC },
  { path: "/account", exact: false, name: '', component: AccountLayout, restricted: EAuthRole.BASIC }
];

export default routes;

