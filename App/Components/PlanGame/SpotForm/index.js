import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import Spacer from '../../Common/Spacer';
import SpotsList from '../../Spots/SpotsList';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotForm = ({ sport, onChange }) => [
  <Spacer key="spacer" size="XL" />,
  <SpotsList
    key="spots"
    sport={(sport && (sport.category || sport.name)) || null}
    onSpotPress={(value) => { onChange({ fieldName: 'spot', value }); }}
  />,
];

SpotForm.propTypes = {
  sport: propType(sportFragment).isRequired,
  onChange: PropTypes.func,
};

SpotForm.defaultProps = {
  onChange: () => {},
};

export default SpotForm;
