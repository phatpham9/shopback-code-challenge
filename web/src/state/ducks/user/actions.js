import { REGISTER, LOGIN, LOGOUT, GET_USER} from './types';
import { Auth } from '../../../api';

const register = (email, password) => async (dispatch) => {
  const user = await Auth.register(email, password);

  dispatch({
    type: REGISTER,
    user,
  });
};

const login = (email, password) => async (dispatch) => {
  const user = await Auth.login(email, password);

  dispatch({
    type: LOGIN,
    user,
  });
};

const logout = () => async (dispatch) => {
  await Auth.logout();

  dispatch({
    type: LOGOUT,
  });
};

const getUser = () => async (dispatch) => {
  const user = await Auth.getUser();

  dispatch({
    type: GET_USER,
    user,
  });
};

export {
  register,
  login,
  logout,
  getUser,
};
