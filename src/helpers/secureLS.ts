/* eslint-disable @typescript-eslint/no-explicit-any */
import SecureLS from 'secure-ls';
import Keys from '../constants/keys';
import { User } from '@/interfaces/user.type';

const ls = new SecureLS({ encodingType: 'aes' });

const set = (key: string, value: any) => {
  ls.set(key, value);
};

const get = (key: string) => {
  return ls.get(key);
};

const remove = (key: string) => {
  return ls.remove(key);
};

const removeToken = () => {
  return ls.remove(Keys.REACT_APP_ACCESS_TOKEN);
};

const setToken = (value: any) => {
  ls.set(Keys.REACT_APP_ACCESS_TOKEN, value);
};

const getToken = () => {
  try {
    return ls.get(Keys.REACT_APP_ACCESS_TOKEN) || null;
  } catch (error) {
    return null;
  }
};

const getProfile = (): User | null => {
  return ls.get(Keys.USER_INFO) || null;
};

const clear = () => {
  return ls.clear();
};

const Secure = {
  set,
  setToken,
  get,
  getToken,
  remove,
  removeToken,
  getProfile,
  clear,
};

export default Secure;
