import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import EventForm from './EventForm';

import { Events } from '../../api';

import './EventEdit.css';

class EventEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: null,
      error: '',
    };

    this.submit = this.submit.bind(this);
  }

  async getEvent() {
    const { period, ...rest } = await Events.getDetails(this.props.match.params.id);

    this.setState({
      event: {
        ...rest,
        period: {
          from: /^([0-9]{4}-[0-9]{2}-[0-9]{2})/.exec(period.from)[0],
          to: /^([0-9]{4}-[0-9]{2}-[0-9]{2})/.exec(period.to)[0],
        },
      },
    });
  }

  async submit(event) {
    try {
      await Events.update(event);

      this.props.history.push('/events');
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  }

  render() {
    return (
      <div className="event-edit">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link to="/events">My Events</Link></BreadcrumbItem>
          <BreadcrumbItem active>{this.state.event ? `Event ${this.state.event.code}` : 'Edit Event'}</BreadcrumbItem>
        </Breadcrumb>

        {this.state.event && <EventForm event={this.state.event} error={this.state.error} onSubmit={this.submit} />}
      </div>
    );
  }

  componentDidMount() {
    this.getEvent();
  }
}

export default EventEdit;
