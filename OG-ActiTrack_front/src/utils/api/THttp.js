import HttpUtils from "./HttpUtils";

export default class THttp {
  static getMethod(method) {
    if (method == null) {
      return null;
    }
    if (method.toLowerCase() === "post") {
      return HttpUtils.POST;
    } else if (method.toLowerCase() === "put") {
      return HttpUtils.PUT;
    } else if (method.toLowerCase() === "delete") {
      return HttpUtils.DELETE;
    } else if (method.toLowerCase() === "get") {
      return HttpUtils.GET;
    }
    return null;
  }
}
