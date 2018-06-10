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
      description={`max distance: ${maxDistance.toFixed(1)}km`}
    />
  </Block>,
  <Divider key="divider-slider" />,
  <Block key="switch">
    <FilterLabel>Sports</FilterLabel>
    {sports.map(sport => (
      <SwitchFilter
        key={sport.uuid}
        description={sport.name}
        value={selectedSportIds.indexOf(sport.uuid) !== -1}
        onChange={() => { onSportSwitch(sport.uuid); }}
      />
    ))}
  </Block>,
  <Divider key="divider-switch" />,
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


/*
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
const Container = styled.ScrollView`
  flex: 1;
`;
//------------------------------------------------------------------------------
const FilterGroup = styled.View`
  border-top-width: 1px;
  border-top-color: ${Colors.gray};
  padding-horizontal: 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsFilter = ({
  maxDistance,
  setMaxDistance,
  sports,
  toggleSport,
}) => (
  <Container>
    <FilterGroup>
      <SliderFilter
        value={maxDistance}
        max={20.0}
        min={0.0}
        onChange={(value) => { setMaxDistance(value); }}
        label={I18n.t('Distance')}
        description={`max distance: ${maxDistance.toFixed(1)}km`}
      />
    </FilterGroup>
    <FilterGroup>
      <FilterLabel>Sports</FilterLabel>
      {sports.map(sport => (
        <SwitchFilter
          key={sport.uuid}
          description={sport.name}
          label=""
          value={typeof sports[sport.uuid] === 'undefined' ? true : sports[sport.uuid]}
          // onChange={() => toggleSport(sport.uuid)}
          onChange={() => toggleSport(sport)}
        />
      ))}
    </FilterGroup>
  </Container>
);

SpotsFilter.propTypes = {
  maxDistance: PropTypes.number,
  setMaxDistance: PropTypes.func,
  sports: PropTypes.arrayOf(propType(sportFragment)),
  selectedSportIds: PropTypes.arrayOf(PropTypes.string),
  toggleSport: PropTypes.func,
};

SpotsFilter.defaultProps = {
  maxDistance: 3,
  sports: [],
  selectedSportIds: [],
  setMaxDistance: () => {},
  toggleSport: () => {},
};

export default SpotsFilter;
*/
