import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n/index';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
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
  filterBySports,
  sports,
  selectedSportIds,
  onSportsFilterSwitch,
  onSportSwitch,
}) => [
  <Block key="slider" style={{ height: 144 }}>
    <SliderFilter
      value={maxDistance}
      max={20.0}
      min={0.0}
      onChange={(value) => { onSliderChange(value); }}
      label={I18n.t('Location')}
      description={`${I18n.t('Shows spots inside')}: ${maxDistance.toFixed(1)}km`}
    />
  </Block>,
  <Divider key="divider-slider" />,
  <Block key="sport-filter" style={{ height: 82 }}>
    <SwitchFilter
      label="Alle sporten"
      description="Filter op type sport"
      value={filterBySports}
      onChange={onSportsFilterSwitch}
    />
  </Block>,
  <Divider key="divider-sport-filter" />,
  <Block key="switch" style={{ flex: 1 }}>
    {sports.map(sport => (
      <SwitchFilter
        key={sport.id}
        label={sport.name}
        value={selectedSportIds.indexOf(sport.id) !== -1}
        onChange={() => { onSportSwitch(sport.id); }}
      />
    ))}
  </Block>,
];

SpotsFilter.propTypes = {
  maxDistance: PropTypes.number,
  onSliderChange: PropTypes.func,
  filterBySports: PropTypes.bool,
  sports: PropTypes.arrayOf(propType(sportFragment)),
  selectedSportIds: PropTypes.arrayOf(PropTypes.string),
  onSportsFilterSwitch: PropTypes.func,
  onSportSwitch: PropTypes.func,
};

SpotsFilter.defaultProps = {
  maxDistance: 3,
  filterBySports: false,
  sports: [],
  selectedSportIds: [],
  onSliderChange: () => {},
  onSportsFilterSwitch: () => {},
  onSportSwitch: () => {},
};

export default SpotsFilter;
