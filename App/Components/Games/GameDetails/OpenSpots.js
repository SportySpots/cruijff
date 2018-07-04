import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Image, TouchableOpacity } from 'react-native';
import I18n from '../../../I18n/index';
import themeImages from '../../../Themes/Images';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import PropertyCircle from '../../../Components/PropertyCircle';
import { getAttendees } from './utils';
import { BlockLabel, HorizontalView } from './style';
import CappedList from '../../CappedList';

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
const restCircle = text => () => (
  <PropertyCircle
    key="extra"
    text={text}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const OpenSpots = ({ game, maxLength, onOpenSpotsPress }) => {
  if (!game.capacity) {
    return null;
  }

  const attendees = getAttendees(game);
  const nOpenSpots = Math.max(0, game.capacity - attendees.length);

  return [
    <BlockLabel key="label">
      {I18n.t('Open spots')}
    </BlockLabel>,
    <TouchableOpacity
      key="open-spots"
      onPress={onOpenSpotsPress}
    >
      <HorizontalView>
        <HorizontalView style={{ flex: 1 }}>
          <CappedList
            max={maxLength}
            data={[...Array(nOpenSpots)]}
            component={openSpotCircle}
            capComponent={({ data }) => restCircle(data.length)}
          />
        </HorizontalView>
      </HorizontalView>
    </TouchableOpacity>,
  ];
};

OpenSpots.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  maxLength: PropTypes.number.isRequired,
  onOpenSpotsPress: PropTypes.func,
};

OpenSpots.defaultProps = {
  onOpenSpotsPress: () => {},
};

export default OpenSpots;
