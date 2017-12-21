import { $get, $post, $delete } from './base';

const PATH = 'auth';

const getUser = async () => {
  try {
    const res = await $get(`${PATH}/login`);

    return res;
  } catch (error) {
    throw error;
  }
};

const register = async (email, password) => {
  try {
    const res = await $post(`${PATH}/register`, JSON.stringify({
      email,
      password,
    }));

    return res;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const res = await $post(`${PATH}/login`, JSON.stringify({
      email,
      password,
    }));

    return res;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    const res = await $delete(`${PATH}/login`);

    return res;
  } catch (error) {
    throw error;
  }
};

export {
  getUser,
  register,
  login,
  logout,
};
