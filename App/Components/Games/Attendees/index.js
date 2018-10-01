import React from 'react';
import PropTypes from 'prop-types';
import UserCircle from '../../Common/UserCircle';
import PropertyCircle from '../../Common/PropertyCircle';
import CappedList from '../../Common/CappedList';
import Row from '../../Common/Row';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Attendees = ({ attendees, maxLength }) => {
  if (attendees.length === 0) {
    return null;
  }

  return (
    <Row>
      <CappedList
        max={maxLength}
        data={attendees}
        keyExtractor={({ user }) => (user.uuid)}
        component={({ user }) => <UserCircle user={user} style={{ marginRight: 8 }} />}
        capComponent={({ data }) => <PropertyCircle key="cap" text={`+${data.length}`} />}
      />
    </Row>
  );
};

Attendees.propTypes = {
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['ATTENDING']),
      user: PropTypes.object, // TODO: use userFragment instead
    }),
  ),
  maxLength: PropTypes.number,
};

Attendees.defaultProps = {
  attendees: [],
  maxLength: 7,
};

export default Attendees;
