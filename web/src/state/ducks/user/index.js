import { register, login, logout, getUser } from './actions';
import * as userSelectors from './selectors';
import reducers from './reducers';

export {
  // actions
  register,
  login,
  logout,
  getUser,
  // selectors
  userSelectors,
};

export default reducers;
