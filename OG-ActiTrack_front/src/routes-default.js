import React from 'react';
import {RoutesEndpoint} from "./Utils/RoutesEndpoint";

const Home = React.lazy(() => import('./views/View/default/Home'));
const Dashboard = React.lazy(() => import('./views/View/default/Dashboard'));
const PlayerActivity = React.lazy(() => import('./views/View/default/PlayerActivity/PlayerActivity'));
const GalaxyActivity = React.lazy(() => import('./views/View/default/GalaxyActivity'));
const AccountLayout = React.lazy(() => import('./views/Containers/AccountLayout'));

const routes = [
  { path: RoutesEndpoint.HOME, exact: true, name: 'Home', component: Home },
  { path: RoutesEndpoint.DASHBOARD, exact: true, name: 'Dashboard', component: Dashboard },
  { path: RoutesEndpoint.PLAYER_Activity, exact: true, name: 'Player Activity', component: PlayerActivity },
  { path: RoutesEndpoint.PLAYER_Galaxy, exact: true, name: 'Galaxy Activity', component: GalaxyActivity },
  { path: "/account", exact: false, name: '', component: AccountLayout }
];

export default routes;

