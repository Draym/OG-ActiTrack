import React from 'react';
import {RoutesEndpoint} from "./utils/RoutesEndpoint";

const Login = React.lazy(() => import('./views/view/auth/Login'));
const Register = React.lazy(() => import('./views/view/auth/Register'));
const ValidateAccount = React.lazy(() => import('./views/view/auth/ValidateAccount'));
const ForgotPassword = React.lazy(() => import('./views/view/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./views/view/auth/ResetPassword'));

const routes = [
  { path: RoutesEndpoint.AUTH_Login, exact: true, name: 'Login', component: Login },
  { path: RoutesEndpoint.AUTH_Register, exact: true, name: 'Register', component: Register },
  { path: RoutesEndpoint.AUTH_ValidateAccount, exact: true, name: 'Validate Account', component: ValidateAccount },
  { path: RoutesEndpoint.AUTH_ForgetPassword, exact: true, name: 'Forgot Password', component: ForgotPassword },
  { path: RoutesEndpoint.AUTH_ResetPassword, exact: true,  name: 'Reset Password', component: ResetPassword }
];

export default routes;

