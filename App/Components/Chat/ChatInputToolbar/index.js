import React from 'react';
import { InputToolbar } from 'react-native-gifted-chat';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ChatInputToolbar = props => (
  <InputToolbar
    {...props}
    containerStyle={{
      borderTopWidth: 0,
      borderTopColor: Colors.transparent,
      backgroundColor: Colors.transparent,
    }}
    primaryStyle={{
      paddingLeft: 8,
      paddingRight: 8,
    }}
  />
);

export default ChatInputToolbar;
