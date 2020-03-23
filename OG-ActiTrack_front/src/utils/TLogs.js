class TLogs {
  static p(...logs) {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    console.log(...logs);
  }
}

export default TLogs;
