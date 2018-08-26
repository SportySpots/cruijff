import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Image } from 'react-native';
import I18n from '../../../I18n';
import themeImages from '../../../Themes/Images';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import PropertyCircle from '../../Common/PropertyCircle';
import CappedList from '../../Common/CappedList';
import Label from '../../Common/Label';
import { getAttendees } from '../utils';
import { HorizontalView } from '../style';

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

  return [
    <Label key="label">
      {I18n.t('Open spots')}
    </Label>,
    <HorizontalView key="spots">
      <CappedList
        max={maxLength}
        data={[...Array(nOpenSpots)]}
        component={openSpotCircle}
        capComponent={({ data }) => restCircle(`+${data.length}`)}
      />
    </HorizontalView>,
  ];
};

OpenSpots.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  maxLength: PropTypes.number,
};

OpenSpots.defaultProps = {
  maxLength: 7,
};

export default OpenSpots;
