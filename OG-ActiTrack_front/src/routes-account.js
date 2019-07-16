import React from 'react';
import {RoutesEndpoint} from "./Utils/RoutesEndpoint";

const Profile = React.lazy(() => import('./views/View/default/Account/Profile'));
const Premium = React.lazy(() => import('./views/View/default/Account/Premium'));
const Settings = React.lazy(() => import('./views/View/default/Account/Settings'));
const Request = React.lazy(() => import('./views/View/default/Account/Request'));
const Security = React.lazy(() => import('./views/View/default/Account/Security'));

const routes = [
  { path: RoutesEndpoint.ACCOUNT_Profile, exact: true,  name: 'User Profile', component: Profile },
  { path: RoutesEndpoint.ACCOUNT_Premium, exact: true, name: 'User Premium', component: Premium },
  { path: RoutesEndpoint.ACCOUNT_Settings, exact: true, name: 'User Settings', component: Settings },
  { path: RoutesEndpoint.ACCOUNT_Request, exact: true, name: 'User Request', component: Request },
  { path: RoutesEndpoint.ACCOUNT_Security, exact: true, name: 'User Security', component: Security }
];

export default routes;

