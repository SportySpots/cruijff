import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import UserCircle from '../../Common/UserCircle';
import PropertyCircle from '../../Common/PropertyCircle';
import CappedList from '../../Common/CappedList';
import { getAttendees } from '../utils';
import { HorizontalView } from '../style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Attendees = ({ game, maxLength }) => {
  const attendees = getAttendees(game);

  if (attendees.length === 0) {
    return null;
  }

  return (
    <HorizontalView style={{ flex: 1 }}>
      <CappedList
        max={maxLength}
        data={attendees}
        keyExtractor={user => user.uuid}
        component={user => <UserCircle user={user} style={{ marginRight: 8 }} />}
        capComponent={({ data }) => <PropertyCircle text={`+${data.length}`} />}
      />
    </HorizontalView>
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

/*
<CappedList
max={7}
data={attendingUsers}
keyExtractor={user => user.uuid}
component={user => <UserCircle user={user} style={{ marginRight: 8 }} />}
capComponent={({ data }) => <PropertyCircle text={`+${data.length}`} />}
/>
*/

/*
import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import UserCircle from '../../../Components/Common/UserCircle';
import PropertyCircle from '../../../Components/Common/PropertyCircle';
import { getAttendees, mapMax } from '../utils';
import { HorizontalView } from '../style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const userCircle = user => (
  <UserCircle
    key={user.uuid}
    user={user}
    style={{ marginRight: 4 }}
  />
);
//------------------------------------------------------------------------------
const restCircle = text => () => (
  <PropertyCircle
    key="extra"
    text={text}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Attendees = ({ game, maxLength }) => {
  const attendees = getAttendees(game);

  if (attendees.length === 0) {
    return null;
  }

  return (
    <HorizontalView style={{ flex: 1 }}>
      {mapMax(
        maxLength,
        attendees,
        userCircle,
        restCircle(`+${attendees.length - (maxLength - 1)}`),
      )}
    </HorizontalView>
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
*/