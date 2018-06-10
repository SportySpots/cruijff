import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import { FilterLabel, FilterDescription, Row } from './style';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Left = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
const Right = styled.View`
  width: 48px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SwitchFilter = ({
  label,
  description,
  value,
  onChange,
}) => (
  <Row>
    <Left>
      <FilterLabel>{label}</FilterLabel>
      <FilterDescription>{description}</FilterDescription>
    </Left>
    <Right>
      <Switch
        value={value}
        onValueChange={() => onChange(!value)}
        thumbTintColor={value ? Colors.primaryGreen : Colors.lightGray}
      />
    </Right>
  </Row>
);

SwitchFilter.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  description: PropTypes.string,
};

SwitchFilter.defaultProps = {
  onChange: () => {},
  label: '',
  description: '',
};

export default SwitchFilter;
