import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import styled from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import ErrorHandling from 'error-handling-utils';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import RoundButton from '../../Common/RoundButton';
// import Error from '../error';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Input = styled.TextInput`
  /* height: 40;*/
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 2px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ChatInputField = ({
  value,
  disabled,
  onChangeText,
  onSubmit,
}) => (
  <Row>
    <Input
      onChangeText={onChangeText}
      value={value}
      disabled={disabled}
    />
    <Spacer row size="L" />
    <RoundButton
      iconSet="MaterialIcons"
      iconName="send"
      status="primary"
      disabled={disabled}
      onPress={onSubmit}
    />
  </Row>
);

ChatInputField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChangeText: PropTypes.func,
  onSubmit: PropTypes.func,
  // errors: PropTypes.shape({
  //   text: PropTypes.array,
  // }),
};

ChatInputField.defaultProps = {
  value: '',
  disabled: false,
  onChangeText: () => {},
  onSubmit: () => {},
};

export default ChatInputField;

/* <Input
  type="text"
  placeholder="Type a message here..."
  onChange={this.handleChange}
  value={text}
  className="flex-auto"
  disabled={disabled}
/> */