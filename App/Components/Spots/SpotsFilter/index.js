import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n/index';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import { FilterLabel } from './style';
import SliderFilter from './SliderFilter';
import SwitchFilter from './SwitchFilter';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Block = styled.View`
  padding: 16px;
`;
//------------------------------------------------------------------------------
const Divider = styled.View`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.lightGray};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsFilter = ({
  maxDistance,
  onSliderChange,
  sports,
  selectedSportIds,
  onSportSwitch,
}) => [
  <Block key="slider">
    <SliderFilter
      value={maxDistance}
      max={20.0}
      min={0.0}
      onChange={(value) => { onSliderChange(value); }}
      label={I18n.t('Distance')}
      description={`${I18n.t('max distance')}: ${maxDistance.toFixed(1)}km`}
    />
  </Block>,
  <Divider key="divider" />,
  <Block key="switch">
    <FilterLabel>Sports</FilterLabel>
    {sports.map(sport => (
      <SwitchFilter
        key={sport.id}
        description={sport.name}
        value={selectedSportIds.indexOf(sport.id) !== -1}
        onChange={() => { onSportSwitch(sport.id); }}
      />
    ))}
  </Block>,
];

SpotsFilter.propTypes = {
  maxDistance: PropTypes.number,
  onSliderChange: PropTypes.func,
  sports: PropTypes.arrayOf(propType(sportFragment)),
  selectedSportIds: PropTypes.arrayOf(PropTypes.string),
  onSportSwitch: PropTypes.func,
};

SpotsFilter.defaultProps = {
  maxDistance: 3,
  sports: [],
  selectedSportIds: [],
  onSliderChange: () => {},
  onSportSwitch: () => {},
};

export default SpotsFilter;
