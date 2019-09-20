export default class MathUtils {
  static round(value) {
    return Math.round(value * 100) / 100;
  }

  static trunc(value) {
    return Math.trunc(value);
  }
}
