import axios from 'axios';
import partial from 'lodash/partial';

import * as authMethods from './auth';

export class API {
  store;

  externalJson = {};
  auth = {};

  methods;

  constructor(methods) {
    this.methods = methods;
  }

  getConfig = () => {
    if (!this.store || typeof this.store.getState !== 'function')
      throw 'No Redux Store found. You have to set a store with .setReduxStore() for the API to work properly.';
    let authState = this.store.getState().auth;
    return {
      auth: authState || {},
    };
  };

  setReduxStore = (store) => {
    this.store = store;

    this.createEndpoints(
      authMethods,
      this.anonymousAxiosInterceptor({
        stage: process.env.STAGE,
      }),
      this.auth
    );

    // set api methods for other modules
    Object.keys(this.methods).forEach((module) => {
      this[module] = {};
      this.createEndpoints(
        methods[module],
        this.authenticatedAxiosInterceptor(),
        this[module],
        true
      );
    });
  };

  createEndpoints = (methods, interceptor, wrapper) => {
    wrapper.__axiosInstance = this.createAxiosInstance(interceptor);
    Object.keys(methods).forEach((name) => {
      wrapper[name] = partial(methods[name], wrapper.__axiosInstance);
    });
  };

  createAxiosInstance = (interceptor = this.publicAxiosInterceptor) => {
    let instance = axios.create();
    // Create axios request interceptor
    instance.interceptors.request.use(interceptor);
    return instance;
  };

  anonymousAxiosInterceptor = (interceptorConfig) => {
    return (axiosConfig) => {
      let contentType = 'application/json';
      let headers = {
        'Content-Type': contentType,
        ...axiosConfig.headers,
      };

      return {
        headers: headers,
        method: axiosConfig.method,
        url: axiosConfig.url,
        data: JSON.stringify(axiosConfig.data) || '{}',
        params: axiosConfig.params || '',
        paramsSerializer: (params) => {
          return qs.stringify(params, { indices: false });
        },
        contentType: contentType,
        validateStatus: function (status) {
          return status >= 200 && status < 600; // default
        },
        withCredentials: true,
      };
    };
  };
}
