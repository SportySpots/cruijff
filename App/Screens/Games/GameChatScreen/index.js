import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { GiftedChat } from 'react-native-gifted-chat';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import { withUser, userPropTypes } from '../../../Context/User';
import FormProps from '../../../RenderProps/form-props';
import ChatManagerProps from '../../../RenderProps/chat-manager-props';
import Row from '../../../Components/Common/Row';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import AbsoluteCenteredActivityIndicator from '../../../Components/Common/AbsoluteCenteredActivityIndicator';
import ChatkitApiCall from '../../../Components/Chat/ChatkitApiCall';
import ChatDay from '../../../Components/Chat/ChatDay';
import ChatSystemMessage from '../../../Components/Chat/ChatSystemMessage';
import ChatBubble from '../../../Components/Chat/ChatBubble';
import ChatInputToolbar from '../../../Components/Chat/ChatInputToolbar';
import ChatComposer from '../../../Components/Chat/ChatComposer';
import ChatSend from '../../../Components/Chat/ChatSend';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Relative = styled.View`
  flex: 1; /* full height */
  position: relative;
  background-color: ${({ theme }) => theme.colors.concrete};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameChatScreen = ({ user, navigation }) => {
  const { roomId } = navigation.state.params;

  console.log('USER', user);
  console.log('ROOM ID', roomId);
  // console.log('I18N LOCALE', I18n.locale.substr(0, 2));

  return (
    <FormProps>
      {({
        disabled,
        errors,
        handleBefore,
        handleServerError,
        handleSuccess,
      }) => (
        <ChatManagerProps userId="readonly" roomId={roomId}>
          {chatHandler => (
            <ChatManagerProps userId={user ? user.uuid : null} roomId={roomId}>
              {(userHandler) => {
                const loggedOut = !(user && user.uuid && !userHandler.loading);
                const serverErrors = errors ? ErrorHandling.getFieldErrors(errors, 'server') : '';
                const noMessages = chatHandler.loading ? [] : [{
                  _id: 1,
                  text: I18n.t('chatInputField.noMessages'),
                  createdAt: new Date(),
                  system: true,
                  // Any additional custom parameters are passed through
                }];

                return (
                  <ChatkitApiCall
                    chatkitUser={userHandler.chatkitUser}
                    roomId={roomId}
                    onSuccess={handleSuccess}
                    onError={handleServerError}
                  >
                    {({ sendMessage }) => (
                      <Relative>
                        {chatHandler.loading && (
                          <AbsoluteCenteredActivityIndicator />
                        )}
                        <GiftedChat
                          user={{ _id: user ? user.uuid : null }}
                          messages={chatHandler.messages.length > 0 ? chatHandler.messages : noMessages}
                          renderAvatarOnTop
                          isAnimated
                          alignTop
                          renderUsernameOnMessage
                          renderBubble={props => <ChatBubble {...props} />}
                          renderDay={props => <ChatDay {...props} locale={I18n.locale.substr(0, 2)} />}
                          renderInputToolbar={props => <ChatInputToolbar {...props} />}
                          minInputToolbarHeight={50}
                          renderSystemMessage={props => <ChatSystemMessage {...props} />}
                          maxComposerHeight={70}
                          keyboardShouldPersistTaps="never"
                          renderComposer={props => <ChatComposer {...props} />}
                          placeholder={I18n.t('chatInputField.placeholder')}
                          textInputProps={{ editable: !(loggedOut || disabled) }}
                          renderSend={props => <ChatSend {...props} disabled={disabled} />}
                          alwaysShowSend
                          onSend={(messages) => {
                            handleBefore(); // set disable props to true
                            sendMessage(messages);
                          }}
                          // Display server side errors if any
                          renderChatFooter={() => (
                            serverErrors.length > 0 ? (
                              <Row>
                                <Spacer row size="ML" />
                                <Text color="error">{serverErrors}</Text>
                              </Row>
                            ) : null
                          )}
                        />
                        <Spacer size="ML" />
                      </Relative>
                    )}
                  </ChatkitApiCall>
                );
              }}
            </ChatManagerProps>
          )}
        </ChatManagerProps>
      )}
    </FormProps>
  );
};

GameChatScreen.propTypes = {
  user: userPropTypes.user,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        roomId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

GameChatScreen.defaultProps = {
  user: null,
};

export default withUser(GameChatScreen);
