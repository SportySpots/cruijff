import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import spotDetailsFragment from '../../../GraphQL/Spots/Fragments/spotDetails';
import Colors from '../../../Themes/Colors';
import Block from '../../Common/Block';
import SpotMapWithLinkFallback from '../SpotMapWithLinkFallback';
import SpotHeader from '../SpotHeader';
// import SpotRating from './SpotRating';
import SpotImages from '../SpotImages';
import SpotProperties from '../SpotProperties';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// <SpotRating spot={spot} userId={userId} />
// eslint-disable-next-line
const SpotDetails = ({ spot, userId }) => [
  <SpotImages key="spot-images" images={(spot && spot.images) || []} />,
  <Block key="spot-header" bgColor={Colors.white}>
    <SpotHeader spot={spot} withDistance withGames />
  </Block>,
  <SpotMapWithLinkFallback key="spot-map" spot={spot} />,
  <SpotProperties key="spot-properties" spot={spot} />,
];

SpotDetails.propTypes = {
  spot: propType(spotDetailsFragment).isRequired,
  userId: PropTypes.string,
  onGamePress: PropTypes.func,
};

SpotDetails.defaultProps = {
  userId: null,
  onGamePress: () => {},
};

export default SpotDetails;
