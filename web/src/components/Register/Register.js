import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Alert, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import { register } from '../../state/ducks/user'

import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
    };

    this.register = this.register.bind(this);
  }

  async register(e) {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await this.props.register(email, password);

      this.props.history.push('/');
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
      <div className="register">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Register</BreadcrumbItem>
        </Breadcrumb>

        <Form onSubmit={this.register}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email address" value={this.state.email} onChange={e => this.change('email', e.target.value)} required />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={e => this.change('password', e.target.value)} required />
          </FormGroup>

          {!!this.state.error && <Alert color="danger">{this.state.error}</Alert>}

          <Button color="primary" block>Register</Button>

          <div className="text-center bottom-link">
            <Link to="/login">Login</Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(null, {
  register,
})(Register);
