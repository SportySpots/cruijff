import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import Row from '../Row';
import Spacer from '../Spacer';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Left = styled.View`
  flex-grow: 1; /* full width */
`;
//------------------------------------------------------------------------------
const Right = styled.View`
  margin-right: -3px;
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
  <Row alignItems="center">
    <Left>
      <Text size="M">{label}</Text>
      <Text size="SM" color="gray">
        {description}
      </Text>
    </Left>
    <Spacer row size="M" />
    <Right>
      <Switch
        value={value}
        onValueChange={() => { onChange(!value); }}
        thumbColor={value ? Colors.primaryGreen : Colors.silver}
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
