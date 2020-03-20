const path = process.env.REACT_APP_API;

export const ApiEndpoint = {
  SERVER_PlayerExist: path + '/server/playerExist',
  SERVER_Available: path + '/server/available',
  SERVER_Galaxy_Available: path + '/server/galaxy/available',
  AUTH_ResetPassword: path + '/auth/reset-password',
  AUTH_ForgotPassword: path + '/auth/forgot-password',
  AUTH_CheckResetPasswordToken: path + '/auth/token/checkResetPasswordToken',
  AUTH_Validate: path + '/auth/validate',
  AUTH_Login: path + '/auth/login',
  AUTH_Register: path + '/auth/register',
  ACTIVITY_FriendGroupPlayer: path + '/activity/friendgroup/player',
  ACTIVITY_FriendGroupGalaxy: path + '/activity/friendgroup/galaxy',
  ACTIVITY_SelfPlayer: path + '/activity/self/player',
  ACTIVITY_SelfGalaxy: path + '/activity/self/galaxy',
  ACTIVITY_GlobalPlayer: path + '/activity/global/player',
  ACTIVITY_GlobalGalaxy: path + '/activity/global/galaxy',
  USER_Update: path + '/user/update',
  USER_Contact: path + '/message/user/contact',
  USER_BugReport: path + '/message/user/bugReport',
  USER_UpdatePassword: path + '/user/update/password',
  USER_Payment_GetAll: path + '/user/payment/getAll',
  FRIEND_Add : path + '/user/friend/add',
  FRIEND_Delete : path + '/user/friend/delete',
  FRIEND_Get_All : path + '/user/friend/get/all',
  FRIEND_GetReverse_All : path + '/user/friend/get/reverse/all'
};
