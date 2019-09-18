import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View } from 'react-native';
import styled from 'styled-components';
import geolib from 'geolib';

import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import { withLocation } from '../../../Context/Location';
import I18n from '../../../I18n';
// import Rating from '../../Common/Rating';
import Text from '../../Common/Text';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import DotSpacer from '../../Common/DotSpacer';
import curatedGames from './utils';
import { compose } from 'react-apollo';
import { withSpotFilters } from '../../../Context/SpotFilters';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
const FlexNone = styled.View`
  flex: none;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------

const rounded = number => (Math.round(number * 10) / 10);

const SpotHeader = ({
  spot,
  gray,
  withDistance,
  withGames,
  locationGPSCoords,
  locationEnabled,
}) => {
  const {
    name,
    sports,
    games: rawGames,
  } = spot;

  // Filter passed games
  const games = (rawGames && curatedGames(rawGames)) || [];

  const showDistance = withDistance
    && locationEnabled
    && spot.address
    && spot.address.lat
    && spot.address.lng;

  let distance;
  if (showDistance) {
    const spotCoords = { latitude: spot.address.lat, longitude: spot.address.lng };
    distance = geolib.getDistance(locationGPSCoords, spotCoords);
  }

  return (
    <View>
      <Text
        size="ML"
        color={gray ? 'gray' : 'black'}
        numberOfLines={1}
      >
        {name}
      </Text>
      <Row>
        {/* [
          <Rating key="rating" rating={spot.rating || 4} />,
          <DotSpacer key="spacer" />,
        ] */}
        <FlexOne>
          <Row>
            {sports.map(({ category }, index) => [
              <Text
                key={category}
                size="SM"
                color={gray ? 'gray' : 'black'}
                numberOfLines={1}
              >
                {I18n.t(category)}
              </Text>,
              // Don't add spacer in case it's the last item
              index !== sports.length - 1 && (
                <DotSpacer key={`spacer-${category}`} />
              ),
            ])}
          </Row>
        </FlexOne>
        <Spacer row size="L" />
        <FlexNone>
          <Row justifyContent="flex-end">
            {showDistance && (
              <Text
                size="SM"
                color={gray ? 'gray' : 'black'}
              >
                {`${rounded(distance / 1000)} KM`}
              </Text>
            )}
            {withGames && !!games && games.length > 0 && [
              <DotSpacer key="spacer" />,
              <Text
                key="games"
                size="SM"
                color={gray ? 'gray' : 'actionYellow'}
              >
                {`${games.length} ${I18n.t('spotHeader.activities', { count: games.length }).toTitleCase()}`}
              </Text>,
            ]}
          </Row>
        </FlexNone>
      </Row>
    </View>
  );
};

SpotHeader.propTypes = {
  spot: propType(spotFragment).isRequired,
  gray: PropTypes.bool,
  withDistance: PropTypes.bool,
  withGames: PropTypes.bool,
};

SpotHeader.defaultProps = {
  gray: false,
  withDistance: false,
  withGames: false,
};

const enhance = compose(
  withLocation,
);

export default enhance(SpotHeader);
