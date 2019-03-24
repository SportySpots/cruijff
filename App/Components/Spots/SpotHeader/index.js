import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View } from 'react-native';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import I18n from '../../../I18n';
// import Rating from '../../Common/Rating';
import Text from '../../Common/Text';
import Row from '../../Common/Row';
import DotSpacer from '../../Common/DotSpacer';
import curatedGames from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotHeader = ({
  spot,
  gray,
  withDistance,
  withGames,
}) => {
  const {
    name,
    sports,
    distance,
    games: rawGames,
  } = spot;

  // Filter passed games
  const games = (rawGames && curatedGames(rawGames)) || [];

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
        {sports.map(({ category }, index) => [
          <Text
            key={category}
            size="SM"
            color={gray ? 'gray' : 'black'}
          >
            {I18n.t(category)}
          </Text>,
          // Don't add spacer in case it's the last item
          index !== sports.length - 1 && (
            <DotSpacer key={`spacer-${category}`} />
          ),
        ])}
        {withDistance && !!distance && [
          <DotSpacer key="spacer" />,
          <Text
            key="distance"
            size="SM"
            color={gray ? 'gray' : 'black'}
          >
            {`${distance} KM`}
          </Text>,
        ]}
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

export default SpotHeader;
