import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import RoundButton from '../../Common/RoundButton';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ChatSend = ({ text, disabled, onSend }) => (
  <Row alignItems="flex-end">
    <Spacer row size="S" />
    <View>
      <RoundButton
        iconSet="MaterialIcons"
        iconName="send"
        status="primary"
        disabled={disabled}
        onPress={() => {
          if (text.trim().length === 0) return;
          onSend({ text: text.trim() }, true);
        }}
      />
      <Spacer size="S" />
    </View>
  </Row>
);

ChatSend.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onSend: PropTypes.func,
};

ChatSend.defaultProps = {
  text: '',
  disabled: false,
  onSend: () => {},
};

export default ChatSend;
