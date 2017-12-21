import createBrowserHistory from 'history/createBrowserHistory';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { Event, Events } from './components/Events';
import Join from './components/Join';

const history = createBrowserHistory();

const routes = [{
  key: 'home',
  path: '/',
  exact: true,
  component: Home,
}, {
  key: 'register',
  path: '/register',
  component: Register,
}, {
  key: 'login',
  path: '/login',
  component: Login,
}, {
  key: 'events',
  path: '/events',
  exact: true,
  strict: true,
  component: Events,
}, {
  key: 'event',
  path: '/events/:id',
  component: Event,
}, {
  key: 'join',
  path: '/join/:code',
  component: Join,
}];

export {
  history,
  routes,
};
