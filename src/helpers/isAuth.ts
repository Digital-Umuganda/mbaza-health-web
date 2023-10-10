import jwtDecode from 'jwt-decode';

import Secure from './secureLS';
import Http from '../config/http';
import Keys from '../constants/keys';
import { User } from '@/interfaces/user.type';
import { redirect } from 'react-router-dom';
import { webAuthPaths } from '@/constants/path';

const isAuth = (token = Secure.getToken()) => {
  try {
    const jwt: { exp: number; sub: string } = jwtDecode(token);
    const now = new Date();
    if (now.getTime() > jwt.exp * 1000) {
      Secure.clear();
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

export const roleToPath = (role: string) => {
  return `${role.toLocaleLowerCase().replace(/_/g, '-')}`;
};

export const roleToString = (role: string) => {
  return role.replace(/_/g, ' ');
};

export const authLoader = (guest = false) => {
  const user = Secure.getProfile();
  if (!user && !guest) {
    Secure.clear();
    throw redirect(webAuthPaths.login);
  }

  if (user && guest) {
    throw redirect(`${roleToPath(user.role)}/home`);
  }

  if (!guest && !isAuth()?.sub) {
    Secure.clear();
    throw redirect(webAuthPaths.login);
  }
  return null;
};
