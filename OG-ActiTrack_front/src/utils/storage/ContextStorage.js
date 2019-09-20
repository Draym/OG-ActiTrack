class ContextStorage {
  static GET(key) {
    return localStorage.getItem(key);
  }
  static CLEAR(key) {
    localStorage.removeItem(key);
  }
  static SET(key, data) {
    localStorage.setItem(key, (typeof data === 'object' ? JSON.stringify(data) : data));
  }
}

export default ContextStorage;

