import axios from 'axios';
import Keys from '../constants/keys';
import isAuth from '../helpers/isAuth';
import Secure from '../helpers/secureLS';
import { ResponseError } from '@/interfaces/error.type';

export default class Http {
  default = axios.create({
    baseURL: Keys.DEFAULT_API,
  });

  constructor(
    token: string = Secure.getToken(),
    api: string = Keys.DEFAULT_API,
  ) {
    this.default = axios.create({
      baseURL: api,
    });
    if (isAuth(token)) {
      this.default.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    this.default.interceptors.response.use(
      response => {
        // If the response status is not 401, simply return the response
        if (response.status !== 401) {
          return response;
        }

        this.logoutUser();

        // Return a rejected promise to stop the further processing of the response
        return Promise.reject(response);
      },
      error => {
        const err = error as ResponseError;

        if (err.response?.status === 401) {
          this.logoutUser();
        }

        // Handle any errors that occur during the request
        return Promise.reject(error);
      },
    );
  }

  logoutUser() {
    Secure.removeToken();
    Secure.remove(Keys.USER_INFO);
  }
}
