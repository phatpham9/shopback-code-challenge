import { $get, $post, $put, $delete } from './base';

const PATH = 'questions';

const getList = async (eventId, sort, order) => {
  try {
    const res = await $get(`${PATH}/${eventId}${sort ? `?sort=${sort}${order ? `&order=${order}` : ''}` : ''}`);

    return res;
  } catch (error) {
    throw error;
  }
};

const create = async ({ event, ...rest}) => {
  try {
    const res = await $post(`${PATH}/${event}`, JSON.stringify(rest));

    return res;
  } catch (error) {
    throw error;
  }
};

const update = async ({ event, _id, ...rest }) => {
  try {
    const res = await $put(`${PATH}/${event}/${_id}`, JSON.stringify(rest));

    return res;
  } catch (error) {
    throw error;
  }
};

const remove = async ({ event, _id }) => {
  try {
    const res = await $delete(`${PATH}/${event}/${_id}`);

    return res;
  } catch (error) {
    throw error;
  }
};

const highlight = async ({ event, _id }) => {
  try {
    const res = await $post(`${PATH}/${event}/${_id}/highlight`);

    return res;
  } catch (error) {
    throw error;
  }
};

const unhighlight = async ({ event, _id }) => {
  try {
    const res = await $delete(`${PATH}/${event}/${_id}/highlight`);

    return res;
  } catch (error) {
    throw error;
  }
};

const like = async ({ event, _id }) => {
  try {
    const res = await $post(`${PATH}/${event}/${_id}/like`);

    return res;
  } catch (error) {
    throw error;
  }
};

const unlike = async ({ event, _id }) => {
  try {
    const res = await $delete(`${PATH}/${event}/${_id}/like`);

    return res;
  } catch (error) {
    throw error;
  }
};

export {
  getList,
  create,
  update,
  remove,
  highlight,
  unhighlight,
  like,
  unlike
};
