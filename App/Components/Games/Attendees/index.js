import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import userNameAvatarFragment from '../../../GraphQL/Users/Fragments/userNameAvatar';
import Avatar from '../../Common/Avatar';
import CappedList from '../../Common/CappedList';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';

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
        component={({ user }) => <Avatar user={user} />}
        capComponent={({ data }) => <Avatar key="cap" text={`+${data.length}`} />}
        ItemSeparatorComponent={() => <Spacer orientation="row" size="M" />}
      />
    </Row>
  );
};

Attendees.propTypes = {
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['ATTENDING']),
      user: propType(userNameAvatarFragment),
    }),
  ),
  maxLength: PropTypes.number,
};

Attendees.defaultProps = {
  attendees: [],
  maxLength: 7,
};

export default Attendees;
