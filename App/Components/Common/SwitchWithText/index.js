import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-native';
import styled from 'styled-components';
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
// TODO: replace Text.SM style={{ color: Colors.gray }} with Text.SM.gray
// (or something along those lines)
const SwitchWithText = ({
  label,
  description,
  value,
  onChange,
}) => (
  <Row alignItems="center">
    <Left>
      <Text.M>{label}</Text.M>
      <Text.SM style={{ color: Colors.gray }}>
        {description}
      </Text.SM>
    </Left>
    <Spacer orientation="row" size="M" />
    <Right>
      <Switch
        value={value}
        onValueChange={() => { onChange(!value); }}
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
