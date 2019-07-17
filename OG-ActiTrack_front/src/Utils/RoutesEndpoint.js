export const RoutesEndpoint = {
  '404': '/404',
  HOME: '/',
  DASHBOARD: '/dashboard',
  PLAYER_Activity: '/activity/player',
  PLAYER_Galaxy: '/activity/galaxy',
  DATA_Colonial: '/data/colonial',
  DATA_Military: '/data/military',
  ACCOUNT_Profile: '/account/:pseudo',
  ACCOUNT_Security: '/account/:pseudo/security',
  ACCOUNT_Premium: '/account/:pseudo/premium',
  ACCOUNT_Settings: '/account/:pseudo/settings',
  ACCOUNT_Request: '/account/:pseudo/request',
  ACCOUNT_FriendList: '/account/:pseudo/friendList',
  ACCOUNT_GroupManagement: '/account/:pseudo/groupManagement',
  ACCOUNT_ReportBug: '/account/:pseudo/reportBug',
  AUTH_Login: '/auth/login',
  AUTH_Register: '/auth/register',
  AUTH_ValidateAccount: '/auth/validate-account/:verificationLink',
  AUTH_ForgetPassword: '/auth/forgot-password',
  AUTH_ResetPassword: '/auth/reset-password/:token',
};
