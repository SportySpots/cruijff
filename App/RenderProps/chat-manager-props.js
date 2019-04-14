import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import Chatkit from '@pusher/chatkit-client/react-native';
import config from '../config';
// import { withUser, userPropTypes } from '../Context/User';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class ChatManagerProps extends React.PureComponent {
  state = {
    loading: true,
    chatkitHandler: null,
    room: null,
    messages: [],
  }

  async componentDidMount() {
    const { handlerId, roomId } = this.props;
    console.log('HANDLER ID', handlerId); // handler can be a user / game
    console.log('ROOM ID', roomId);
    // Get the authentication token from async storage if it exists
    // const token = await AsyncStorage.getItem('TOKEN');

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: config.chatkitInstanceLocator,
      userId: handlerId,
      tokenProvider: new Chatkit.TokenProvider({
        url: config.seedorfChatkitUrl,
        // headers: {
        //   'Content-Type': 'application/json',
        //   authorization: token ? `JWT ${token}` : null,
        //   cookie: null,
        // },
      }),
    });

    let chatkitHandler = null;

    try {
      chatkitHandler = await chatManager.connect();
      this.setState({ chatkitHandler });
    } catch (exc) {
      console.error('exc', exc);
    }

    if (handlerId.contains('user_') && !roomId) {
      throw new Error('Room ID is required');
    }
    if (handlerId.contains('game_') && roomId) {
      throw new Error('Room ID should not be present');
    }

    try {
      const room = chatkitHandler.subscribeToRoom({
        roomId: roomId || chatkitHandler.rooms[0].id, // games should have one room only
        messageLimit: 100,
        hooks: {
          onMessage: (message) => {
            this.setState(prevState => ({
              messages: [...prevState.messages, message],
            }));
          },
        },
      });
      this.setState({ room });
    } catch (exc) {
      console.error('exc', exc);
    }

    this.setState({ loading: false });
  }

  render() {
    const { children } = this.props;
    const { loading, chatkitHandler, room, messages } = this.state;

    console.log('messages', messages);
    // Public API
    const api = {
      loading,
      chatkitHandler,
      room,
      messages,
    };

    return children(api);
  }
}

ChatManagerProps.propTypes = {
  handlerId: PropTypes.string.isRequired,
  roomId: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

ChatManagerProps.defaultProps = {
  roomId: null,
};

export default ChatManagerProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const disabledPropTypes = {
  loading: PropTypes.bool.isRequired,
  chatkitHandler: PropTypes.object.isRequired,
  room: PropTypes.object,
  messages: PropTypes.arrayOf(PropTypes.object),
  // disableBtn: PropTypes.func.isRequired,
  // enableBtn: PropTypes.func.isRequired,
};


// import React from 'react';
// import PropTypes from 'prop-types';
// import { AsyncStorage } from 'react-native';
// import Chatkit from '@pusher/chatkit-client/react-native';
// import config from '../config';
// import { withUser, userPropTypes } from '../Context/User';

// //------------------------------------------------------------------------------
// // PROPS AND METHODS PROVIDER:
// //------------------------------------------------------------------------------
// class ChatManagerProps extends React.PureComponent {
//   state = {
//     loading: true,
//     chatkitUser: null,
//     room: null,
//     messages: [],
//     // usersWhoAreTyping: [],
//   }

//   async componentDidMount() {
//     const { user, roomId } = this.props;
//     console.log('USERRRR', user);
//     // Get the authentication token from async storage if it exists
//     const token = await AsyncStorage.getItem('TOKEN');

//     console.log('CONFIG', config);

//     const chatManager = new Chatkit.ChatManager({
//       instanceLocator: config.chatkitInstanceLocator,
//       userId: (user && user.uuid) || null,
//       tokenProvider: new Chatkit.TokenProvider({
//         url: config.seedorfChatkitUrl,
//         // headers: {
//         //   'Content-Type': 'application/json',
//         //   authorization: token ? `JWT ${token}` : null,
//         //   cookie: null,
//         // },
//       }),
//     });

//     let chatkitUser = null;

//     try {
//       chatkitUser = await chatManager.connect();
//       this.setState({ chatkitUser });
//     } catch (exc) {
//       console.error('exc', exc);
//     }

//     if (roomId > 0) {
//       try {
//         const room = chatkitUser.subscribeToRoom({
//           roomId,
//           messageLimit: 100,
//           hooks: {
//             onMessage: (message) => {
//               this.setState(prevState => ({
//                 messages: [...prevState.messages, message],
//               }));
//             },
//             // onUserStartedTyping: (user) => {
//             //   this.setState(prevState => ({
//             //     usersWhoAreTyping: [...prevState.usersWhoAreTyping, user.name],
//             //   }));
//             // },
//             // onUserStoppedTyping: (user) => {
//             //   this.setState(prevState => ({
//             //     usersWhoAreTyping: prevState.usersWhoAreTyping.filter(
//             //       username => username !== user.name,
//             //     ),
//             //   }));
//             // },
//           },
//         });
//         this.setState({ room });
//       } catch (exc) {
//         console.error('exc', exc);
//       }
//     }

//     this.setState({ loading: false });
//   }

//   render() {
//     const { children } = this.props;
//     const { loading, chatkitUser, room, messages } = this.state;

//     console.log('messages', messages);
//     // Public API
//     const api = {
//       loading,
//       chatkitUser,
//       room,
//       messages,
//     };

//     return children(api);
//   }
// }

// ChatManagerProps.propTypes = {
//   user: userPropTypes.user,
//   roomId: PropTypes.string,
//   children: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.object,
//   ]).isRequired,
// };

// ChatManagerProps.defaultProps = {
//   user: null,
//   roomId: null,
// };

// export default withUser(ChatManagerProps);

// //------------------------------------------------------------------------------
// // PROP TYPES:
// //------------------------------------------------------------------------------
// export const disabledPropTypes = {
//   loading: PropTypes.bool.isRequired,
//   chatkitUser: PropTypes.object.isRequired,
//   room: PropTypes.object,
//   messages: PropTypes.arrayOf(PropTypes.object),
//   // disableBtn: PropTypes.func.isRequired,
//   // enableBtn: PropTypes.func.isRequired,
// };
