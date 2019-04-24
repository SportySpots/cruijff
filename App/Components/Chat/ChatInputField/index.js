import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
// import cloneDeep from 'lodash/cloneDeep';
// import pick from 'lodash/pick';
// import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
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
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.silver};
  border-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.M.fontFamily};
  font-size: ${({ theme }) => theme.fonts.M.fontSize};
  padding: 8px;
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
  <Row alignItems="flex-end">
    <Input
      onChangeText={onChangeText}
      value={value}
      disabled={disabled}
      placeholder={I18n.t('chatInputField.placeholder')}
      multiline
      maxHeight={70}
    />
    <Spacer row size="S" />
    <View>
      <RoundButton
        iconSet="MaterialIcons"
        iconName="send"
        status="primary"
        disabled={disabled}
        onPress={onSubmit}
      />
      <Spacer size="S" />
    </View>
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
