import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Flex = styled.View`
  display: flex;
  align-items: flex-end;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const TextField = ({ whiteColor, displayCounter, ...rest }) => [
  <TextInput
    key="text-input"
    placeholderTextColor={whiteColor ? Colors.white : Colors.black}
    selectionColor={whiteColor ? Colors.white : Colors.black}
    underlineColorAndroid={whiteColor ? Colors.white : Colors.black}
    {...rest}
  />,
  <Flex key="counter">
    {!!(displayCounter && rest.maxLength) && (
      <Text style={{ color: whiteColor ? Colors.white : Colors.black }}>
        {(rest.value && rest.value.length) || 0} / {rest.maxLength}
      </Text>
    )}
  </Flex>,
];

TextField.propTypes = {
  whiteColor: PropTypes.bool,
  displayCounter: PropTypes.bool,
  // Same props as native TextInput
};

TextField.defaultProps = {
  whiteColor: false,
  displayCounter: false,
  // Same props as native TextInput
};

export default TextField;
