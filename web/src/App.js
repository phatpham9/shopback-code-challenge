import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import Header from './components/Common/Header';

import { routes, history } from './routes';
import store from './state';
import { getUser } from './state/ducks/user';

import './App.css';

store.dispatch(getUser());

const App = () => (
  <ReduxProvider store={store}>
    <Router history={history}>
      <div className="app">
        <script src="/socket/socket.io.js"></script>

        <Header history={history} />

        <Container>
          <div className="row justify-content-md-center">
            <div className="col col-md-6">
              {routes.map((route) => (
                <Route {...route} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </Router>
  </ReduxProvider>
);

export default App;
