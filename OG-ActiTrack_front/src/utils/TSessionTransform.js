class TSessionTransform {
  static getProfileId(session) {
    if (session.user && session.user.pseudo && session.user.secret) {
      return session.user.pseudo + "#" + session.user.secret;
    }
    return undefined;
  }

  static getInfoFromProfileId(profile) {
    if (!profile || profile.indexOf("#") <= 0)
      return null;
    let result = profile.split("#");
    if (result.length !== 2)
      return null;
    return {pseudo: result[0], secret: result[1]};
  }
}

export default TSessionTransform;
