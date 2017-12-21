import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, InputGroupButton, Button, Input, Alert } from 'reactstrap';

import { Events } from '../../api';

import { userSelectors } from '../../state/ducks/user';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      error: '',
    };

    this.join = this.join.bind(this);
    this.create = this.create.bind(this);
  }

  changeCode(code) {
    this.setState({
      code,
    });
  }

  async join() {
    try {
      await Events.check(this.state.code);

      this.props.history.push(`/join/${this.state.code}`);
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  }

  create() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/events/create');
    } else {
      this.props.history.push('/login?redirect=/events/create');
    }
  }

  render() {
    return (
      <div className="home">
        <FormGroup>
          <InputGroup>
            <Input type="text" placeholder="Enter event's code..." value={this.state.code} onChange={e => this.changeCode(e.target.value)} />

            <InputGroupButton>
              <Button color="primary" onClick={this.join}>Join</Button>
            </InputGroupButton>
          </InputGroup>
        </FormGroup>  

        {!!this.state.error && <Alert color="warning">{this.state.error}</Alert>}

        <div className="separtor">or</div>

        <Button color="primary" block onClick={this.create}>Create Event</Button>
      </div>
    );
  }
}

export default connect((state) => ({
  isLoggedIn: userSelectors.isLoggedIn(state),
}))(Home);
