import UserSession from "../storage/UserSession";
import EAuthRole from "./EAuthRole";
import TLogs from "../TLogs";

let AuthUtils = function () {
  function hasAuthorization(role, required) {
    if (!required || required === EAuthRole.NONE)
      return true;
    if (role === EAuthRole.NONE)
      return false;
    return role <= required;
  }

  function isAuthorized(required) {
    let role = EAuthRole.NONE;
    if (UserSession.hasSession()) {
      role = UserSession.getUserField('role').level;
    }
    TLogs.p("IS AUTHORIZED? ", role, required);
    return hasAuthorization(role, required);
  }

  function navAuthorized(navigation) {
    let navItems = [];
    let role = EAuthRole.NONE;
    if (UserSession.hasSession()) {
      role = UserSession.getUserField('role').level;
    }
    for (let i = 0; i < navigation.items.length; ++i) {
      if (hasAuthorization(role, navigation.items[i].restricted)) {
        navItems.push(navigation.items[i]);
      }
    }
    navigation.items = navItems;
    return navigation;
  }

  return {
    isAuthorized: function (required) {
      return isAuthorized(required);
    },
    navAuthorized: function (navigation) {
      return navAuthorized(navigation);
    }
  }
};

export default AuthUtils();
