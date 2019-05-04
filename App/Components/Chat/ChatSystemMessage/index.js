import React from 'react';
import { SystemMessage } from 'react-native-gifted-chat';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const textStyle = {
  ...Fonts.SM,
  color: Colors.shade,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// See: https://github.com/FaridSafi/react-native-gifted-chat/blob/master/src/SystemMessage.tsx
const ChatSystemMessage = props => (
  <SystemMessage
    {...props}
    textStyle={textStyle}
  />
);

ChatSystemMessage.propTypes = {
  ...SystemMessage.propTypes,
};

export default ChatSystemMessage;
