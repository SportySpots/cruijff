import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Image } from 'react-native';
import I18n from '../../../I18n/index';
import themeImages from '../../../Themes/Images';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import PropertyCircle from '../../../Components/Common/PropertyCircle';
import { getAttendees } from './utils';
import { BlockLabel, HorizontalView } from './style';
import CappedList from '../../Common/CappedList';

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
    <BlockLabel key="label">
      {I18n.t('Open spots')}
    </BlockLabel>,
    <HorizontalView key="open-spots">
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
  maxLength: PropTypes.number.isRequired,
};

OpenSpots.defaultProps = {
};

export default OpenSpots;
