import { $get, $post, $put, $delete } from './base';

const PATH = 'events';

const getList = async () => {
  try {
    const res = await $get(PATH);

    return res;
  } catch (error) {
    throw error;
  }
};

const create = async (event) => {
  try {
    const res = await $post(PATH, JSON.stringify(event));

    return res;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (id) => {
  try {
    const res = await $get(`${PATH}/${id}`);

    return res;
  } catch (error) {
    throw error;
  }
};

const update = async ({ _id, ...rest }) => {
  try {
    const res = await $put(`${PATH}/${_id}`, JSON.stringify(rest));

    return res;
  } catch (error) {
    throw error;
  }
};

const remove = async ({ _id }) => {
  try {
    const res = await $delete(`${PATH}/${_id}`);

    return res;
  } catch (error) {
    throw error;
  }
};

const check = async (code) => {
  try {
    const res = await $get(`${PATH}/${code}/check`);

    return res;
  } catch (error) {
    throw error;
  }
};

const join = async (code) => {
  try {
    const res = await $get(`${PATH}/${code}/join`);

    return res;
  } catch (error) {
    throw error;
  }
};

export {
  getList,
  create,
  getDetails,
  update,
  remove,
  check,
  join,
};
