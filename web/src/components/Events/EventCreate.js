import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import EventForm from './EventForm';

import { Events } from '../../api';

import './EventCreate.css';

class EventCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };

    this.submit = this.submit.bind(this);
  }

  async submit(event) {
    try {
      await Events.create(event);

      this.props.history.push('/events');
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  }

  render() {
    return (
      <div className="event-create">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link to="/events">My Events</Link></BreadcrumbItem>
          <BreadcrumbItem active>Create Event</BreadcrumbItem>
        </Breadcrumb>

        <EventForm event={this.state.event} error={this.state.error} onSubmit={this.submit} />
      </div>
    );
  }
}

export default EventCreate;
