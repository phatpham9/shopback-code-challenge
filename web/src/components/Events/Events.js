import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, ListGroupItemHeading,  FormText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Events as EventsAPI } from '../../api';
import { userSelectors } from '../../state/ducks/user';

import './Events.css';

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  async getEvents() {
    try {
      const events = await EventsAPI.getList();

      this.setState({
        events,
      });
    } catch (err) {
      alert(err.message);
    }
  }

  create() {
    this.props.history.push('/events/create');
  }

  click(id) {
    this.props.history.push(`/events/${id}`);
  }

  render() {
    return (
      <div className="events">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>My Events</BreadcrumbItem>
        </Breadcrumb>

        <ListGroup>
          {this.state.events.map(({ _id, code, title, description, period }) => (
            <ListGroupItem key={_id} tag="a" href="javascript:void(0)" action onClick={e => this.click(_id)}>
              <ListGroupItemHeading>{title}</ListGroupItemHeading>
              
              <div>
                <FormText color="muted">
                  <span>Code: {code}</span> | <span>Period: {new Date(period.from).toLocaleDateString()} - {new Date(period.to).toLocaleDateString()}</span>
                </FormText>

                <div className="description d-block">{description}</div>
              </div>
            </ListGroupItem>
          ))}

          <ListGroupItem className="text-center font-weight-bold" tag="a" href="javascript:void(0)" active onClick={e => this.create()}>Create Event</ListGroupItem>
        </ListGroup>
      </div>
    );
  }

  componentDidMount() {
    this.getEvents();
  }
}

export default connect(state => ({
  isLoggedIn: userSelectors.isLoggedIn(state),
}))(Events);
