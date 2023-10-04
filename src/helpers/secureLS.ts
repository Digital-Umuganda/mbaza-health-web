/* eslint-disable @typescript-eslint/no-explicit-any */
import SecureLS from 'secure-ls';
import Keys from '../constants/keys';
import { User } from '@/interfaces/user.type';

const set = (key: string, value: any) => {
  const ls = new SecureLS({ encodingType: 'aes' });
  ls.set(key, value);
};

const get = (key: string) => {
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.get(key);
};

const remove = (key: string) => {
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.remove(key);
};

const removeToken = () => {
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.remove(Keys.REACT_APP_ACCESS_TOKEN);
};

const setToken = (value: any) => {
  const ls = new SecureLS({ encodingType: 'aes' });
  ls.set(Keys.REACT_APP_ACCESS_TOKEN, value);
};

const getToken = () => {
  const ls = new SecureLS({ encodingType: 'aes' });
  try {
    return ls.get(Keys.REACT_APP_ACCESS_TOKEN) || null;
  } catch (error) {
    return null;
  }
};

const getProfile = (): User | null => {
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.get(Keys.USER_INFO) || null;
};

const Secure = {
  set,
  setToken,
  get,
  getToken,
  remove,
  removeToken,
  getProfile,
};

export default Secure;
