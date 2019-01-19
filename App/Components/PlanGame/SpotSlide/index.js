import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { locationPropTypes, withLocation } from '../../../Context/Location';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Spacer from '../../Common/Spacer';
import SpotsList from '../../Spots/SpotsList';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: get maxDistance from context
const SpotSlide = ({
  sport,
  location,
  spot,
  onChange,
}) => [
  <Spacer key="spacer" size="XL" />,
  <SpotsList
    key="spots"
    cardComponent="SpotListCardSmall"
    sportsIds={sport && sport.id ? [sport.id] : []} // empty array will return all spots
    userCoords={location}
    // maxDistance={maxDistance} // km
    selectedSpot={spot}
    onCardPress={(value) => { onChange({ fieldName: 'spot', value }); }}
  />,
];

SpotSlide.propTypes = {
  sport: propType(sportFragment),
  location: locationPropTypes.location.isRequired,
  spot: propType(spotFragment),
  onChange: PropTypes.func,
};

SpotSlide.defaultProps = {
  sport: null,
  spot: null,
  onChange: () => {},
};

export default withLocation(SpotSlide);
