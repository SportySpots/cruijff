import React from 'react';
import { Bubble } from 'react-native-gifted-chat';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ChatBubble = props => (
  <Bubble
    {...props}
    wrapperStyle={{
      left: {
        backgroundColor: Colors.white,
        borderRadius: 8,
      },
      right: {
        backgroundColor: Colors.notify,
        borderRadius: 8,
      },
    }}
    textStyle={{
      left: {
        fontFamily: Fonts.SM.fontFamily,
        fontSize: Fonts.SM.fontSize,
        color: Colors.black,
      },
      right: {
        fontFamily: Fonts.SM.fontFamily,
        fontSize: Fonts.SM.fontSize,
        color: Colors.black,
      },
    }}
    timeTextStyle={{
      left: {
        fontFamily: Fonts.SSM.fontFamily,
        fontSize: Fonts.SSM.fontSize,
        color: Colors.link,
      },
      right: {
        fontFamily: Fonts.SSM.fontFamily,
        fontSize: Fonts.SSM.fontSize,
        color: Colors.white,
      },
    }}
  />
);

ChatBubble.propTypes = {
  ...Bubble.propTypes,
};

export default ChatBubble;
