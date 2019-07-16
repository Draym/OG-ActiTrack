import React from 'react';
import {RoutesEndpoint} from "./Utils/RoutesEndpoint";

const Home = React.lazy(() => import('./views/View/default/Home'));
const Dashboard = React.lazy(() => import('./views/View/default/Dashboard'));
const Profile = React.lazy(() => import('./views/View/default/Account/Profile'));
const Premium = React.lazy(() => import('./views/View/default/Account/Premium'));
const Settings = React.lazy(() => import('./views/View/default/Account/Settings'));
const PlayerActivity = React.lazy(() => import('./views/View/default/PlayerActivity/PlayerActivity'));
const GalaxyActivity = React.lazy(() => import('./views/View/default/GalaxyActivity'));

const routes = [
  { path: RoutesEndpoint.HOME, exact: true, name: 'Home', component: Home },
  { path: RoutesEndpoint.DASHBOARD, exact: true, name: 'Dashboard', component: Dashboard },
  { path: RoutesEndpoint.PLAYER_Activity, exact: true, name: 'Player Activity', component: PlayerActivity },
  { path: RoutesEndpoint.PLAYER_Galaxy, exact: true, name: 'Galaxy Activity', component: GalaxyActivity },
  { path: RoutesEndpoint.ACCOUNT_User, exact: true,  name: 'Account', component: Profile },
  { path: RoutesEndpoint.ACCOUNT_Premium, exact: true, name: 'User Premium', component: Premium },
  { path: RoutesEndpoint.ACCOUNT_Settings, exact: true, name: 'User Settings', component: Settings }
];

export default routes;

