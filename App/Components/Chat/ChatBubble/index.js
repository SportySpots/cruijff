import React from 'react';
import { Bubble } from 'react-native-gifted-chat';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const wrapperStyle = {
  left: {
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  right: {
    backgroundColor: Colors.notify,
    borderRadius: 8,
  },
};
const textStyle = {
  left: {
    ...Fonts.SM,
    color: Colors.black,
  },
  right: {
    ...Fonts.SM,
    color: Colors.black,
  },
};
const timeTextStyle = {
  left: {
    ...Fonts.SSM,
    color: Colors.link,
  },
  right: {
    ...Fonts.SSM,
    color: Colors.white,
  },
};
const bottomContainerStyle = {
  left: {
    justifyContent: 'space-between',
  },
};
const usernameStyle = {
  ...Fonts.SSM,
  color: Colors.link,
  top: 0,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// See: https://github.com/FaridSafi/react-native-gifted-chat/blob/master/src/Bubble.tsx
const ChatBubble = props => (
  <Bubble
    {...props}
    wrapperStyle={wrapperStyle}
    textStyle={textStyle}
    timeTextStyle={timeTextStyle}
    bottomContainerStyle={bottomContainerStyle}
    usernameStyle={usernameStyle}
  />
);

ChatBubble.propTypes = {
  ...Bubble.propTypes,
};

export default ChatBubble;
