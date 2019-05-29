import React from 'react';

const Dashboard = React.lazy(() => import('./views/Components/Dashboard'));
const Profile = React.lazy(() => import('./views/Components/Account/Profile'));
const Premium = React.lazy(() => import('./views/Components/Account/Premium'));
const Settings = React.lazy(() => import('./views/Components/Account/Settings'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/account/:pseudo', exact: true,  name: 'Account', component: Profile },
  { path: '/account/:pseudo/premium', exact: true, name: 'User Premium', component: Premium },
  { path: '/account/:pseudo/settings', exact: true, name: 'User Settings', component: Settings }
];

export default routes;

