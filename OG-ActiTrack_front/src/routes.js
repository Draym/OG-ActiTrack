import React from 'react';

const Home = React.lazy(() => import('./views/View/Home'));
const Dashboard = React.lazy(() => import('./views/View/Dashboard'));
const Profile = React.lazy(() => import('./views/View/Account/Profile'));
const Premium = React.lazy(() => import('./views/View/Account/Premium'));
const Settings = React.lazy(() => import('./views/View/Account/Settings'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/account/:pseudo', exact: true,  name: 'Account', component: Profile },
  { path: '/account/:pseudo/premium', exact: true, name: 'User Premium', component: Premium },
  { path: '/account/:pseudo/settings', exact: true, name: 'User Settings', component: Settings }
];

export default routes;

