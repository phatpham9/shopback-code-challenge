import { REGISTER, LOGIN, LOGOUT, GET_USER } from './types';

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
    case GET_USER:
      return action.user ? {
        ...state,
        ...action.user,
      } : null;

    case LOGOUT:
      return null;

    default:
      return state;
  }
};

export default userReducer;
