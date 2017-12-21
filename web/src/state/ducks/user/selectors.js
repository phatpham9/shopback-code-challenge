const isLoggedIn = state => !!(state.user && state.user.email);
const getUser = state => state.user;

export {
  isLoggedIn,
  getUser,
};
