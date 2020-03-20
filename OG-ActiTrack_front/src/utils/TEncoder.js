import TLogs from "./TLogs";

class TEncoder {
  static stringToB64(data) {
    return window.btoa(unescape(encodeURIComponent(data)));
  }

  static b64ToString(data) {
    try {
      return decodeURIComponent(escape(window.atob(data)));
    } catch (e) {
      TLogs.p("TEncoder: decode failed.");
      return undefined;
    }
  }
}

export default TEncoder;
