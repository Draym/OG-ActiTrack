import React from 'react';
import {RoutesEndpoint} from "./utils/RoutesEndpoint";

const Profile = React.lazy(() => import('./views/view/default/Account/Profile'));
const Premium = React.lazy(() => import('./views/view/default/Account/Premium'));
const DashboardSettings = React.lazy(() => import('./views/view/default/Account/DashboardSettings'));
const Contact = React.lazy(() => import('./views/view/default/Account/Contact'));
const Security = React.lazy(() => import('./views/view/default/Account/Security'));
const GroupManagement = React.lazy(() => import('./views/view/default/Account/GroupManagement'));
const FriendList = React.lazy(() => import('./views/view/default/Account/FriendList'));
const BugReport = React.lazy(() => import('./views/view/default/Account/BugReport'));

const routes = [
  { path: RoutesEndpoint.ACCOUNT_Profile, exact: true,  name: 'User Profile', component: Profile },
  { path: RoutesEndpoint.ACCOUNT_Premium, exact: true, name: 'User Premium', component: Premium },
  { path: RoutesEndpoint.ACCOUNT_DashboardSettings, exact: true, name: 'Dashboard Settings', component: DashboardSettings },
  { path: RoutesEndpoint.ACCOUNT_Contact, exact: true, name: 'User Request', component: Contact },
  { path: RoutesEndpoint.ACCOUNT_Security, exact: true, name: 'User Security', component: Security },
  { path: RoutesEndpoint.ACCOUNT_BugReport, exact: true, name: 'Report Bug', component: BugReport },
  { path: RoutesEndpoint.ACCOUNT_FriendList, exact: true, name: 'Friend List', component: FriendList },
  { path: RoutesEndpoint.ACCOUNT_GroupManagement, exact: true, name: 'Group Management', component: GroupManagement }
];

export default routes;

