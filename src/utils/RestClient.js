/*
 * @file: RestClient.js
 * @description: Configure RestClient Class to handle all API related methods
 * @author: Megha Sethi
 * */
import querystring from 'querystring';
import axios from 'axios';

var config = {
  headers: { 'Content-Type': 'application/json' }
};

class RestClient { 
  static post(url, params, token = '') {
    config.headers['Content-Type'] = 'application/json';
    return new Promise(function(fulfill, reject) {
      axios
        .post(url, JSON.stringify(params), config)

        .then(function(response) {
          fulfill(response);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response);
          } else {
            reject(error);
          }
        });
    });
  }

  static put(url, params, token = '') {
    config.headers['Content-Type'] = 'application/json';
    return new Promise(function(fulfill, reject) {
      axios
        .put(url, JSON.stringify(params), config)
        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static delete(url, token = '') {
    config.headers['Content-Type'] = 'application/json';
    return new Promise(function(fulfill, reject) {
      axios
        .delete(url, config)
        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static get(url, params, token = '') {
    let finalURL = url;
    if(params){
      let query = querystring.stringify(params);
      finalURL = url + '?' + query
    }
    config.headers['Content-Type'] = 'application/json';
    return new Promise(function(fulfill, reject) {
      axios
        .get(finalURL, config)
        .then(function(response) {
          fulfill(response);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** Form-Data Method ***********/
  static postFormData(url, params, token = '') {
    config.headers['Content-Type'] = 'multipart/form-data';
    return new Promise(function(fulfill, reject) {
      axios
        .post(url, params, config, token)

        .then(function(response) {
          fulfill({ statusCode: response.status, data: response.data });
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
}

export default RestClient;
