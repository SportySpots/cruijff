import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import UserCircle from '../../Common/UserCircle';
import PropertyCircle from '../../Common/PropertyCircle';
import CappedList from '../../Common/CappedList';
import Row from '../../Common/Row';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Attendees = ({ game, maxLength }) => {
  const attendees = getAttendees(game);

  if (attendees.length === 0) {
    return null;
  }

  return (
    <Row>
      <CappedList
        max={maxLength}
        data={attendees}
        keyExtractor={user => user.uuid}
        component={user => <UserCircle user={user} style={{ marginRight: 8 }} />}
        capComponent={({ data }) => <PropertyCircle key="cap" text={`+${data.length}`} />}
      />
    </Row>
  );
};

Attendees.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  maxLength: PropTypes.number,
};

Attendees.defaultProps = {
  maxLength: 7,
};

export default Attendees;
