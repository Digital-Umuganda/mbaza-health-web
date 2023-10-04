import jwtDecode from 'jwt-decode';

import Secure from './secureLS';
import Http from '../config/http';
import Keys from '../constants/keys';
import { User } from '@/interfaces/user.type';

const isAuth = (token = Secure.getToken()) => {
  try {
    const jwt: { exp: number; sub: string } = jwtDecode(token);
    const now = new Date();
    if (now.getTime() > jwt.exp * 1000) {
      Secure.removeToken();
      return null;
    }

    return jwt;
  } catch (error) {
    return null;
  }
};

export default isAuth;

export const getAuthUser = async (
  token: string = Secure.getToken(),
) => {
  const existUser = Secure.getProfile();
  const authData = isAuth(token);
  if (!authData) {
    return null;
  }

  if (
    existUser &&
    [existUser.email, existUser.phone_number].includes(authData.sub)
  ) {
    return existUser;
  }

  try {
    const { data } = await new Http(token).default.get('/users/me');
    Secure.set(Keys.USER_INFO, data.data);
    Secure.setToken(token);
    return data.data as User;
  } catch (error) {
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await new Http().default.post('/');
  } catch (error) {
    console.log(error);
  } finally {
    Secure.removeToken();
    Secure.remove(Keys.USER_INFO);
  }
};
