import React from 'react';
import { Bubble } from 'react-native-gifted-chat';
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
        color: Colors.black,
      },
      right: {
        color: Colors.black,
      },
    }}
    timeTextStyle={{
      left: {
        color: Colors.link,
      },
      right: {
        color: Colors.white,
      },
    }}
  />
);

ChatBubble.propTypes = {
  ...Bubble.propTypes,
};

export default ChatBubble;



// import React from 'react';
// import PropTypes from 'prop-types';
// import { View } from 'react-native';
// import styled from 'styled-components';
// import Row from '../../Common/Row';
// import Spacer from '../../Common/Spacer';
// import Text from '../../Common/Text';
// import Triangle from '../Triangle';

// //------------------------------------------------------------------------------
// // STYLE:
// //------------------------------------------------------------------------------
// const Bubble = styled.View`
//   background-color: ${({ theme, primary }) => (primary ? theme.colors.notify : theme.colors.white)};
//   padding: 8px 8px 4px 12px;
//   border-radius: 8px;
// `;
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const ChatBubble = ({
//   primary,
//   position,
//   title,
//   text,
//   date,
// }) => (
//   <Row
//     justifyContent={position === 'left' ? 'flex-start' : 'flex-end'}
//     style={{ flex: 1 }}
//   >
//     {position === 'left' && (
//       <View>
//         <Spacer size="XL" />
//         <Triangle
//           position="top-right"
//           primary={primary}
//         />
//       </View>
//     )}
//     <Bubble primary={primary}>
//       {!!title && (
//         <Text semibold numberOfLines={1}>
//           {title}
//         </Text>
//       )}
//       <Spacer size="XS" />
//       <Text>
//         {text}
//       </Text>
//       <Spacer size="XS" />
//       <Row justifyContent="flex-end">
//         <Text color={primary ? 'white' : 'link'}>
//           {date}
//         </Text>
//       </Row>
//     </Bubble>
//     {position === 'right' && (
//       <View>
//         <Spacer size="XL" />
//         <Triangle
//           position="top-left"
//           primary={primary}
//         />
//       </View>
//     )}
//   </Row>
// );

// ChatBubble.propTypes = {
//   primary: PropTypes.bool,
//   position: PropTypes.oneOf(['left', 'right']),
//   title: PropTypes.string,
//   text: PropTypes.string,
//   date: PropTypes.string,
// };

// ChatBubble.defaultProps = {
//   primary: false,
//   position: 'left',
//   title: '',
//   text: '',
//   date: '',
// };

// export default ChatBubble;
