class TString {
  static isNull(data) {
    return !data || data === '' || data === "";
  }

  static extractUrlParam(key, data) {
    let index = data.indexOf(key);
    if (index < 0)
      return undefined;
    if (data.indexOf('&') > 0) {
      return data.substring(index + key.length + 1, data.indexOf('&'));
    } else {
      return data.substring(index + key.length + 1);
    }
  }
  static contains(value, target, sensitive = false) {
    if (sensitive) {
      return value.indexOf(target) >= 0;
    } else {
      return value.toLowerCase().indexOf(target.toLowerCase()) >= 0;
    }
  }
}

export default TString;
