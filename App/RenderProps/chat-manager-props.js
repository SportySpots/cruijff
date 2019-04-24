import React from 'react';
import PropTypes from 'prop-types';
// import { AsyncStorage } from 'react-native';
import Chatkit from '@pusher/chatkit-client/react-native';
import config from '../config';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
// TODO: change name to ...
class ChatManagerProps extends React.PureComponent {
  state = {
    loading: true,
    chatkitUser: null,
    room: null,
    messages: [],
  }

  async componentDidMount() {
    const { roomId } = this.props;
    console.log('config', config);

    // Get the authentication token from async storage if it exists
    // const token = await AsyncStorage.getItem('TOKEN');

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: config.chatkitInstanceLocator,
      userId: 'readonly',
      tokenProvider: new Chatkit.TokenProvider({
        url: config.seedorfChatkitUrl,
        // headers: {
        //   'Content-Type': 'application/json',
        //   authorization: token ? `JWT ${token}` : null,
        //   cookie: null,
        // },
      }),
    });

    let chatkitUser = null;

    try {
      chatkitUser = await chatManager.connect();
      this.setState({ chatkitUser });
    } catch (exc) {
      console.error('exc', exc);
      return;
    }

    try {
      const room = chatkitUser.subscribeToRoom({
        roomId,
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

  async componentWillUnmount() {
    const { chatkitUser } = this.state;

    if (chatkitUser) {
      try {
        chatkitUser.disconnect();
      } catch (exc) {
        console.error('disconnect exc', exc);
      }
    }
  }

  render() {
    const { children } = this.props;
    const {
      loading,
      chatkitUser,
      room,
      messages,
    } = this.state;

    // Public API
    const api = {
      loading,
      chatkitUser,
      room,
      messages,
    };

    return children(api);
  }
}

ChatManagerProps.propTypes = {
  roomId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default ChatManagerProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const disabledPropTypes = {
  loading: PropTypes.bool.isRequired,
  chatkitUser: PropTypes.object.isRequired,
  room: PropTypes.object,
  messages: PropTypes.arrayOf(PropTypes.object),
};
