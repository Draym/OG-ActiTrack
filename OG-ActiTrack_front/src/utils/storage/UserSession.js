import LoginRedirect from "../auth/LoginRedirect";

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

  static getSessionField(field) {
    if (!field)
      return null;
    let session = this.getSession();

    if (session.user != null) {
      return session.user['' + field];
    }
    return null;
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