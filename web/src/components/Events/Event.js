import React from 'react';

import EventCreate from './EventCreate';
import EventEdit from './EventEdit';

const EventRender = props => {
  if (props.match.params.id === 'create') {
    return <EventCreate {...props} />;
  } else {
    return <EventEdit {...props} />;
  }
};

export default EventRender;
