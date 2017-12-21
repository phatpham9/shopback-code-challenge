import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

import './EventForm.css';

class EventForm extends Component {
  constructor(props) {
    super(props);

    const { event, error } = props;

    this.state = {
      ...(event || {
        code: '',
        title: '',
        description: '',
        period: {
          from: '',
          to: '',
        },
      }),
      error,
    };

    this.submit = this.submit.bind(this);
  }

  change(field, value) {
    this.setState({
      [field]: value,
    });
  }

  changePeriod(field, value) {
    this.setState({
      period: {
        ...this.state.period,
        [field]: value,
      },
    });
  }

  submit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <Form className="event-form" onSubmit={this.submit}>
        <FormGroup>
          <Label for="code">Code</Label>
          <Input type="text" name="code" id="code" placeholder="Code" value={this.state.code} onChange={e => this.change('code', e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" placeholder="Title" value={this.state.title} onChange={e => this.change('title', e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" id="description" placeholder="Description" value={this.state.description} onChange={e => this.change('description', e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label for="from">Period</Label>
          <div className="row">
            <div className="col col-md-6">
              <Input type="date" name="from" id="from" placeholder="From" value={this.state.period.from} onChange={e => this.changePeriod('from', e.target.value)} required />
            </div>
            <div className="col col-md-6">
              <Input type="date" name="to" id="to" placeholder="To" value={this.state.period.to} onChange={e => this.changePeriod('to', e.target.value)} required />
            </div>
          </div>
        </FormGroup>

        {!!this.state.error && <Alert color="danger">{this.state.error}</Alert>}

        <Button color="primary" block>Save</Button>
      </Form>
    );
  }
}

export default EventForm;
