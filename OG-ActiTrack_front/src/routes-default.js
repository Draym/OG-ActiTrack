import React from 'react';
import {RoutesEndpoint} from "./utils/RoutesEndpoint";
import EAuthRole from "./utils/auth/EAuthRole";

const Home = React.lazy(() => import('./views/view/default/Home'));
const Dashboard = React.lazy(() => import('./views/view/default/Dashboard'));
const PlayerActivity = React.lazy(() => import('./views/view/default/PlayerActivity/PlayerActivity'));
const GalaxyActivity = React.lazy(() => import('./views/view/default/GalaxyActivity'));
const AccountLayout = React.lazy(() => import('./views/containers/AccountLayout'));
const GetHelp = React.lazy(() => import('./views/view/default/Information/GetHelp'));
const HowToStart = React.lazy(() => import('./views/view/default/Information/HowToStart'));
const ColonialReport = React.lazy(() => import('./views/view/default/DataAnalysis/ColonialReport'));
const MilitaryReport = React.lazy(() => import('./views/view/default/DataAnalysis/MilitaryReport'));
const SpyReport = React.lazy(() => import('./views/view/default/DataAnalysis/SpyReport'));

const routes = [
  { path: RoutesEndpoint.HOME, exact: true, name: 'Home', component: Home, restricted: EAuthRole.NONE },
  { path: RoutesEndpoint.HOWTOSTART, exact: true, name: 'How to Start', component: HowToStart, restricted: EAuthRole.NONE },
  { path: RoutesEndpoint.DASHBOARD, exact: true, name: 'Dashboard', component: Dashboard, restricted: EAuthRole.ADMIN },
  { path: RoutesEndpoint.PLAYER_Activity, exact: true, name: 'Player Activity', component: PlayerActivity, restricted: EAuthRole.BASIC },
  { path: RoutesEndpoint.PLAYER_Galaxy, exact: true, name: 'Galaxy Activity', component: GalaxyActivity, restricted: EAuthRole.BASIC },
  { path: RoutesEndpoint.GETHELP, exact: true, name: 'Get Help', component: GetHelp, restricted: EAuthRole.BASIC },
  { path: RoutesEndpoint.DATA_Colonial, exact: true, name: 'Colonial Report', component: ColonialReport, restricted: EAuthRole.BASIC },
  { path: RoutesEndpoint.DATA_Military, exact: true, name: 'Military Report', component: MilitaryReport, restricted: EAuthRole.BASIC },
  { path: RoutesEndpoint.DATA_Spy, exact: true, name: 'Spy Reports', component: SpyReport, restricted: EAuthRole.BASIC },
  { path: "/account", exact: false, name: '', component: AccountLayout, restricted: EAuthRole.BASIC }
];

export default routes;

