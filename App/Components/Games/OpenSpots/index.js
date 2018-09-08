import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Image } from 'react-native';
import themeImages from '../../../Themes/Images';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import PropertyCircle from '../../Common/PropertyCircle';
import CappedList from '../../Common/CappedList';
import Row from '../../Common/Row';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const openSpotCircle = (_, i) => (
  <Image
    key={i}
    source={themeImages.spotOpenCircle}
    style={{ width: 42, height: 42, marginRight: 4 }}
  />
);
//------------------------------------------------------------------------------
const restCircle = text => (
  <PropertyCircle
    key="extra"
    text={text}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const OpenSpots = ({ game, maxLength }) => {
  if (!game.capacity) {
    return null;
  }

  const attendees = getAttendees(game);
  const nOpenSpots = Math.max(0, game.capacity - attendees.length);

  return (
    <Row>
      <CappedList
        max={maxLength}
        data={[...Array(nOpenSpots)]}
        component={openSpotCircle}
        capComponent={({ data }) => restCircle(`+${data.length}`)}
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
