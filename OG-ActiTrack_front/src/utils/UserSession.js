class UserSession {
  static sessionKey() {
    return 'user-data';
  }

  static getSession() {
    let session = localStorage.getItem(UserSession.sessionKey());

    if (session != null) {
      return JSON.parse(session);
    }
    return null;
  }

  static getPseudo() {
    let session = UserSession.getSession();

    if (session != null) {
      return session.user.pseudo;
    }
    return null;
  }

  static updateUser(user) {
    let session = this.getSession();
    session.user = user;
    this.storeSession(session);
  }

  static clearSession() {
    localStorage.removeItem(UserSession.sessionKey());
  }

  static storeSession(session) {
    localStorage.setItem(UserSession.sessionKey(), JSON.stringify(session));
  }

  static hasSession() {
    return localStorage.getItem(UserSession.sessionKey()) != null;
  }
}

export default UserSession;
