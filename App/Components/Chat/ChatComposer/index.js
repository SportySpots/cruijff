import React from 'react';
import { Composer } from 'react-native-gifted-chat';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ChatComposer = props => (
  <Composer
    {...props}
    textInputStyle={{
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderColor: Colors.silver,
      borderRadius: 5,
      padding: 8,
      fontFamily: Fonts.M.fontFamily,
      fontSize: Fonts.M.fontSize,
      lineHeight: 1.5 * Fonts.M.fontSize,
      marginLeft: 0,
      elevation: 1.5,
      shadowOffset: { width: 0, height: 1 },
      shadowColor: Colors.black,
      shadowOpacity: 0.25,
      shadowRadius: 2.25,
    }}
  />
);

export default ChatComposer;
