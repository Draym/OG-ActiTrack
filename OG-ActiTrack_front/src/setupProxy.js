const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy(process.env.REACT_APP_API, { target: process.env.REACT_APP_SERVER_URL }));
};
