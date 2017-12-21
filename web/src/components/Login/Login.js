import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Alert, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import qs from 'qs';

import { login } from '../../state/ducks/user'

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
    };

    this.login = this.login.bind(this);
  }

  async login(e) {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await this.props.login(email, password);

      const { redirect } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

      this.props.history.push(redirect ? redirect : '/');
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  }

  change(field, value) {
    this.setState({
      [field]: value,
    });
  }

  render() {
    return (
      <div className="login">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Login</BreadcrumbItem>
        </Breadcrumb>

        <Form onSubmit={this.login}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email address" value={this.state.email} onChange={e => this.change('email', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={e => this.change('password', e.target.value)} />
          </FormGroup>

          {!!this.state.error && <Alert color="danger">{this.state.error}</Alert>}

          <Button color="primary" block>Login</Button>

          <div className="text-center bottom-link">
            <Link to="/register">Register</Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(null, {
  login,
})(Login);
