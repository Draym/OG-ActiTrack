import {RoutesEndpoint} from "../RoutesEndpoint";
import TEncoder from "../TEncoder";

let redirectHome = function(code) {
  code = code ? code : window.location.pathname;
  window.location.href = RoutesEndpoint.AUTH_Login + (code? "?redirect=" + TEncoder.stringToB64(code) : '');
};

export default redirectHome;
