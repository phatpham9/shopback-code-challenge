import React, { Component } from 'react';
import { Button, FormGroup, Input, Form, Alert } from 'reactstrap';

import Socket from '../../../socket';

import { Questions } from '../../../api';

import './NewQuestion.css';

class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      event: props.event._id,
      error: '',
    };

    this.submit = this.submit.bind(this);
  }

  change(field, value) {
    this.setState({
      [field]: value,
    });
  }

  async submit(e) {
    e.preventDefault();

    try {
      const question = await Questions.create(this.state);

      Socket.publishQuestionChanges('add', question);

      if (this.props.onSuccess) {
        this.props.onSuccess(question);
      }

      this.setState({
        description: '',
        error: '',
      });
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  }

  render() {
    return (
      <Form className="new-question" onSubmit={this.submit}>
        <FormGroup>
          <Input type="textarea" name="description" id="description" placeholder="New question..." value={this.state.description} onChange={e => this.change('description', e.target.value)} required />
        </FormGroup>

        {!!this.state.error && <Alert color="danger">{this.state.error}</Alert>}

        <Button color="primary" block>Ask</Button>
      </Form>
    );
  }
}

export default NewQuestion;
