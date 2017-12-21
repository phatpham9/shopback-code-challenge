import React from 'react';
import { connect } from 'react-redux';
import { Navbar } from 'reactstrap';
import { Link } from 'react-router-dom';

import { logout, userSelectors } from '../../../state/ducks/user';

import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <Navbar className="clearfix d-block header" color="faded" light expand="md">
        <Link className="navbar-brand" to="/">Home</Link>

        {this.props.isLoggedIn ? (
          <div className="float-right">
            <Link className="my-events-link" to="/events">My Events</Link>
            <Link to="/" onClick={this.props.logout}>Logout</Link>
          </div>
        ) : (
          <div className="float-right">
            <Link className="register-link" to={'/register'}>Register</Link>
            <Link to={`/login?redirect=${window.location.pathname}`}>Login</Link>
          </div>
        )}
      </Navbar>
    );
  }
};

export default connect(state => ({
  isLoggedIn: userSelectors.isLoggedIn(state),
}), {
  logout,
})(Header);
