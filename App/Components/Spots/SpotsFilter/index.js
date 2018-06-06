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
          onChange={() => toggleSport(sport.uuid)}
        />
      ))}
    </FilterGroup>
  </Container>
);

SpotsFilter.propTypes = {
  sports: PropTypes.arrayOf(propType(sportFragment)),
  maxDistance: PropTypes.number,
  setMaxDistance: PropTypes.func,
  toggleSport: PropTypes.func,
};

SpotsFilter.defaultProps = {
  sports: [],
  maxDistance: 3,
  setMaxDistance: () => {},
  toggleSport: () => {},
};

export default SpotsFilter;
