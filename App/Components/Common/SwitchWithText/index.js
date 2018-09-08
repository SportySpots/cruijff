import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import { FilterDescription, Row } from '../../Spots/SpotsFilter/style';

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
const SwitchWithText = ({
  label,
  description,
  value,
  onChange,
}) => (
  <Row style={{ height: 56 }}>
    <Left>
      <Text.M>{label}</Text.M>
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

SwitchWithText.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  description: PropTypes.string,
};

SwitchWithText.defaultProps = {
  onChange: () => {},
  label: '',
  description: '',
};

export default SwitchWithText;
