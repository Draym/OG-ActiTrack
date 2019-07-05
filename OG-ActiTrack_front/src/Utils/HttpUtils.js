import UserSession from "./UserSession";

let HttpUtils = function() {

  function stringifyParameters(parameters) {
    let result = '';

    for(let i in parameters) {
      if (result !== '')
        result += '&';
      result += i + '=' + parameters[i];
    }
    result = (result === '' ? result : '?' + result);
    return result;
  }
  function httpResult(response, cbSuccess, cbError) {
    if (response.status === 200) {
      console.log("response: ", response);
      response.json().then(function (data) {
        cbSuccess(data);
      });
    } else {
      response.text().then(function(data){
        cbError(response.status, data);
      });
    }
  }

  function httpURL(type, url, api, headers, parameters, cbSuccess, cbError) {
    if (!headers)
      headers = {};
    if (UserSession.hasSession()) {
      let session = UserSession.getSession();
      headers.Authorization = session.token.token;
    }
    let urlParameters = stringifyParameters(parameters);
    fetch(url + api + urlParameters, {
      method: type,
      headers: headers
    }).then(response => {
      httpResult(response, cbSuccess, cbError);
    }).catch(error => {
      console.log(error);
      cbError(error);
    });
  }

  function httpData(type, url, api, headers, data, cbSuccess, cbError) {
    if (!headers)
      headers = {};
    if (UserSession.hasSession()) {
      let session = UserSession.getSession();
      headers.Authorization = session.token.token;
    }
    console.log(url, api);
    fetch(url + api, {
      method: type,
      headers: headers,
      body: JSON.stringify(data)
    }).then(response => {
      httpResult(response, cbSuccess, cbError);
    }).catch(error => {
      console.log(error);
      cbError(error);
    });
  }

  return ({
    GET: function(url, api, parameters, cbSuccess, cbError){
      let headers = {};
      //headers['Accept'] = 'text/plain';
      httpURL('GET', url, api, headers, parameters, cbSuccess, cbError);
    },
    POST: function(url, api, data, cbSuccess, cbError){
      let headers = {};
      headers['Content-Type'] = 'application/json';
      headers['Accept'] = 'application/json';
      httpData('POST', url, api, headers, data, cbSuccess, cbError);
    },
    PUT: function(url, api, data, cbSuccess, cbError){
      let headers = {};
      headers['Content-Type'] = 'application/json';
      headers['Accept'] = 'application/json';
      httpData('PUT', url, api, headers, data, cbSuccess, cbError);
    },
    DELETE: function(url, api, data, cbSuccess, cbError){
      let headers = {};
      headers['Content-Type'] = 'application/json';
      headers['Accept'] = 'application/json';
      httpData('DELETE', url, api, headers, data, cbSuccess, cbError);
    }
  });
};

export default HttpUtils;
