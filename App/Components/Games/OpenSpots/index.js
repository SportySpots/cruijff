import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import Avatar from '../../Common/Avatar';
import CappedList from '../../Common/CappedList';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const OpenSpots = ({ game, maxLength }) => {
  if (!game.capacity) {
    return null;
  }

  const attendees = getAttendees(game.attendees);
  const nOpenSpots = Math.max(0, game.capacity - attendees.length);

  return (
    <Row>
      <CappedList
        max={maxLength}
        data={[...Array(nOpenSpots)]}
        component={(_, i) => <Avatar key={i} />}
        capComponent={({ data }) => <Avatar key="cap" text={`+${data.length}`} />}
        ItemSeparatorComponent={() => <Spacer row size="M" />}
      />
    </Row>
  );
};

OpenSpots.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  maxLength: PropTypes.number,
};

OpenSpots.defaultProps = {
  maxLength: 7,
};

export default OpenSpots;
