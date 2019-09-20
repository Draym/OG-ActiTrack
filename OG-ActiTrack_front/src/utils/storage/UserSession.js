class UserSession {
  static sessionKey() {
    return 'user-data';
  }

  static getSession() {
    let session = localStorage.getItem(this.sessionKey());

    if (session != null) {
      return JSON.parse(session);
    }
    return null;
  }

  static getSessionField(field) {
    if (!field)
      return null;
    let user = this.getSession();

    if (user != null) {
      return user['' + field];
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
