import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n/index';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import Block from '../../Common/Block';
import Divider from '../../Common/Divider';
import SliderWithText from '../../Common/SliderWithText';
import SwitchFilter from './SwitchFilter';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsFilter = ({
  maxDistance,
  onSliderChange,
  allSports,
  sports,
  selectedSportIds,
  onSportsFilterSwitch,
  onSportSwitch,
}) => [
  <Block key="slider">
    <SliderWithText
      value={maxDistance}
      max={20.0}
      min={0.0}
      onChange={(value) => { onSliderChange(value); }}
      label={I18n.t('Location')}
      description={`${I18n.t('Shows spots inside')}: ${maxDistance.toFixed(1)}km`}
    />
  </Block>,
  <Divider key="divider-slider" />,
  <Block key="sport-filter">
    <SwitchFilter
      label={I18n.t('All sports')}
      description={I18n.t('Filter on type of sport')}
      value={allSports}
      onChange={onSportsFilterSwitch}
    />
  </Block>,
  <Divider key="divider-sport-filter" />,
  <Block key="switch">
    {sports.map(sport => (
      <SwitchFilter
        key={sport.id}
        label={I18n.t(sport.name)}
        value={selectedSportIds.indexOf(sport.id) !== -1}
        onChange={() => { onSportSwitch(sport.id); }}
      />
    ))}
  </Block>,
];

SpotsFilter.propTypes = {
  maxDistance: PropTypes.number,
  onSliderChange: PropTypes.func,
  allSports: PropTypes.bool,
  sports: PropTypes.arrayOf(propType(sportFragment)),
  selectedSportIds: PropTypes.arrayOf(PropTypes.string),
  onSportsFilterSwitch: PropTypes.func,
  onSportSwitch: PropTypes.func,
};

SpotsFilter.defaultProps = {
  maxDistance: 3,
  allSports: false,
  sports: [],
  selectedSportIds: [],
  onSliderChange: () => {},
  onSportsFilterSwitch: () => {},
  onSportSwitch: () => {},
};

export default SpotsFilter;
