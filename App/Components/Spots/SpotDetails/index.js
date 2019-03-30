import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import I18n from '../../../I18n';
import spotDetailsFragment from '../../../GraphQL/Spots/Fragments/spotDetails';
import Block from '../../Common/Block';
import Text from '../../Common/Text';
import GamesList from '../../Games/GamesList';
import SpotMapWithLinkFallback from '../SpotMapWithLinkFallback';
import SpotHeader from '../SpotHeader';
// import SpotRating from './SpotRating';
import SpotImages from '../SpotImages';
// import SpotAmenities from '../SpotAmenities';
import curatedGames from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const GamesContainer = styled.View`
  padding: 0 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// <SpotRating spot={spot} userUUID={userUUID} />
// eslint-disable-next-line
const SpotDetails = ({ spot, onGamePress, userUUID }) => {
  // Filter passed games
  const games = (spot.games && curatedGames(spot.games)) || [];

  return [
    <SpotImages key="spot-images" images={(spot && spot.images) || []} />,
    <Block key="spot-header" bgColor="white">
      <SpotHeader spot={spot} withDistance withGames />
    </Block>,
    <SpotMapWithLinkFallback key="spot-map" spot={spot} />,
    // <SpotAmenities key="spot-amenities" spot={spot} />,
    <Block key="games-title">
      <Text size="ML">
        {I18n.t('spotDetails.activities')}
      </Text>
    </Block>,
    <GamesContainer key="games-list">
      <GamesList
        games={games}
        onCardPress={onGamePress}
        contentContainerStyle={{
          flexGrow: 1, // centers not-found-component
          paddingBottom: 8,
          minHeight: 200,
        }}
      />
    </GamesContainer>,
  ];
};

SpotDetails.propTypes = {
  spot: propType(spotDetailsFragment).isRequired,
  userUUID: PropTypes.string,
  onGamePress: PropTypes.func,
};

SpotDetails.defaultProps = {
  userUUID: null,
  onGamePress: () => {},
};

export default SpotDetails;
