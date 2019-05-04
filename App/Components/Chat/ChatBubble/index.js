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
const usernameStyle = {
  ...Fonts.SSM,
  color: Colors.link,
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
    usernameStyle={usernameStyle}
  />
);

ChatBubble.propTypes = {
  ...Bubble.propTypes,
};

export default ChatBubble;


// import React from 'react';
// import { View } from 'react-native';
// import { Bubble } from 'react-native-gifted-chat';
// import Fonts from '../../../Themes/Fonts';
// import Colors from '../../../Themes/Colors';
// import Row from '../../Common/Row';
// import Spacer from '../../Common/Spacer';
// import Triangle from '../Triangle';

// //------------------------------------------------------------------------------
// // STYLE:
// //------------------------------------------------------------------------------
// const wrapperStyle = {
//   left: {
//     backgroundColor: Colors.white,
//     borderRadius: 8,
//   },
//   right: {
//     backgroundColor: Colors.notify,
//     borderRadius: 8,
//   },
// };
// const textStyle = {
//   left: {
//     fontFamily: Fonts.SM.fontFamily,
//     fontSize: Fonts.SM.fontSize,
//     color: Colors.black,
//   },
//   right: {
//     fontFamily: Fonts.SM.fontFamily,
//     fontSize: Fonts.SM.fontSize,
//     color: Colors.black,
//   },
// };
// const timeTextStyle = {
//   left: {
//     fontFamily: Fonts.SSM.fontFamily,
//     fontSize: Fonts.SSM.fontSize,
//     color: Colors.link,
//   },
//   right: {
//     fontFamily: Fonts.SSM.fontFamily,
//     fontSize: Fonts.SSM.fontSize,
//     color: Colors.white,
//   },
// };
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// // See: https://github.com/FaridSafi/react-native-gifted-chat/blob/master/src/Bubble.tsx
// const ChatBubble = (props) => {
//   const { position } = props;

//   return (
//     <Row
//       justifyContent={position === 'left' ? 'flex-start' : 'flex-end'}
//       style={{ flex: 1 }}
//     >
//       {position === 'left' && (
//         <View>
//           <Spacer size="L" />
//           <Triangle
//             position="top-right"
//             primary={false}
//           />
//         </View>
//       )}
//       <Bubble
//         {...props}
//         wrapperStyle={wrapperStyle}
//         textStyle={textStyle}
//         timeTextStyle={timeTextStyle}
//         // containerToNextStyle={containerToNextStyle}
//         // containerToPreviousStyle={containerToPreviousStyle}
//       />
//       {position === 'right' && (
//         <View>
//           <Spacer size="L" />
//           <Triangle
//             position="top-left"
//             primary
//           />
//         </View>
//       )}
//     </Row>
//   );
// };

// ChatBubble.propTypes = {
//   ...Bubble.propTypes,
// };

// export default ChatBubble;
