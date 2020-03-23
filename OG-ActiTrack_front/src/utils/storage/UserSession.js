import LoginRedirect from "../auth/LoginRedirect";
import EAuthRole from "../auth/EAuthRole";
import TLogs from "../TLogs";

class UserSession {
  static sessionKey() {
    return 'user-data';
  }

  static getSession() {
    let session = localStorage.getItem(this.sessionKey());

    if (session != null) {
      return JSON.parse(session);
    } else {
      LoginRedirect();
    }
  }

  static getTokenField(field) {
    if (!field)
      return null;
    let session = this.getSession();

    if (session.token != null) {
      return session.token['' + field];
    }
    return null;
  }

  static getUserField(field) {
    if (!field)
      return null;
    let session = this.getSession();
    TLogs.p("Session:", session);
    if (session.user != null) {
      return session.user['' + field];
    }
    return null;
  }

  static isPremium() {
    try {
      return EAuthRole.PREMIUM === this.getUserField("role").name
    } catch (e) {
      return false;
    }
  }

  static clearSession() {
    localStorage.removeItem(this.sessionKey());
  }

  static storeSession(data) {
    localStorage.setItem(this.sessionKey(), JSON.stringify(data));
  }

  static hasSession() {
    return localStorage.getItem(this.sessionKey()) != null;
  }
}

export default UserSession;
