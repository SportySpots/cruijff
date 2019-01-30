import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Spacer from '../../Common/Spacer';
import SpotsList from '../../Spots/SpotsList';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: probably move maxDistance to SpotsList and get said value from context
const SpotSlide = ({ sport, spot, onChange }) => [
  <Spacer key="spacer" size="XL" />,
  <SpotsList
    key="spots"
    cardComponent="SpotListCardSmall"
    sportsIds={sport && sport.id ? [sport.id] : []} // empty array will return all spots
    // maxDistance={maxDistance} // km
    selectedSpot={spot}
    onCardPress={(value) => { onChange({ fieldName: 'spot', value }); }}
  />,
];

SpotSlide.propTypes = {
  sport: propType(sportFragment),
  spot: propType(spotFragment),
  onChange: PropTypes.func,
};

SpotSlide.defaultProps = {
  sport: null,
  spot: null,
  onChange: () => {},
};

export default SpotSlide;
