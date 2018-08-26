import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import FieldSet from '../FieldSet';
import Label from '../Label';
import Text from '../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Flex = styled.View`
  display: flex;
  align-items: flex-end;
`;
//------------------------------------------------------------------------------
const Error = styled(Text)`
  color: red;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: on error, errorMsg, TextInput and Label fields should be red
const TextField = ({
  label,
  hasError,
  errorMsg,
  whiteColor,
  displayCounter,
  ...rest
}) => (
  <FieldSet>
    <Label whiteColor={whiteColor}>
      {label}
    </Label>
    {hasError && <Error>{errorMsg}</Error>}
    <TextInput
      placeholderTextColor={whiteColor ? Colors.white : Colors.black}
      selectionColor={whiteColor ? Colors.white : Colors.black}
      underlineColorAndroid={whiteColor ? Colors.white : Colors.black}
      {...rest}
    />
    <Flex>
      {!!(displayCounter && rest.maxLength) && (
        <Text style={{ color: whiteColor ? Colors.white : Colors.black }}>
          {(rest.value && rest.value.length) || 0} / {rest.maxLength}
        </Text>
      )}
    </Flex>
  </FieldSet>
);

TextField.propTypes = {
  label: PropTypes.string,
  hasError: PropTypes.bool,
  errorMsg: PropTypes.string,
  whiteColor: PropTypes.bool,
  displayCounter: PropTypes.bool,
  // Plus all props from native TextInput
};

TextField.defaultProps = {
  label: '',
  hasError: false,
  errorMsg: '',
  whiteColor: false,
  displayCounter: false,
};

export default TextField;
