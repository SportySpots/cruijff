import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components/native';
import union from 'lodash/union';
import moment from 'moment';
import { withUser, userPropTypes } from '../../../Context/User';
import { TopLayout, BottomLayout } from '../../../Components/Layouts/FixedBottomLayout';
import ChatManagerProps from '../../../RenderProps/chat-manager-props';
import Block from '../../../Components/Common/Block';
import Spacer from '../../../Components/Common/Spacer';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import ChatMsg from '../../../Components/Chat/ChatMsg';
import ChatForm from '../../../Components/Chat/ChatForm';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameChatScreen = ({ user, navigation }) => {
  const gameUUID = navigation.state.params.uuid;
  const isLoggedIn = !!(user && user.uuid);
  const gameHandlerId = `game_${gameUUID}`;
  const userHandlerId = `user_${isLoggedIn ? user.uuid : ''}`;
  const roomName = `room_${gameUUID}`;

  return (
    <FlexOne>
      <TopLayout bgColor="transparent">
        <Block>
          <ChatManagerProps handlerId={gameHandlerId}>
            {({ loading, messages }) => {
              if (loading) {
                return <CenteredActivityIndicator />;
              }

              return messages.map((msg) => {
                const isSender = msg.senderId === userHandlerId;
                const date = moment.utc(msg.createdAt).local().format('HH:mm');
                return (
                  <View key={msg.id}>
                    <ChatMsg
                      title={msg.sender.name}
                      text={msg.text}
                      date={date}
                      primary={isSender}
                      position={isSender ? 'right' : 'left'}
                      user={{
                        name: msg.sender.name,
                        profile: {
                          avatar: msg.sender.avatarURL,
                        },
                      }}
                    />
                    <Spacer size="L" />
                  </View>
                );
              });
            }}
          </ChatManagerProps>
        </Block>
      </TopLayout>
      <BottomLayout
        bgColor="transparent"
        borderColor="transparent"
      >
        {isLoggedIn && (
          <ChatManagerProps
            handlerId={userHandlerId}
            getJoinableRooms
          >
            {({ loading, chatkitHandler, joinableRooms }) => {
              if (loading) {
                return <CenteredActivityIndicator />;
              }

              const allRooms = union(chatkitHandler.rooms, joinableRooms);
              const roomId = allRooms.find(({ name }) => name === roomName).id;

              return (
                <ChatForm
                  onSuccessHook={async ({ text }) => {
                    try {
                      await chatkitHandler.sendMessage({ text, roomId });
                    } catch (exc) {
                      console.log(exc);
                      // onError({ text: [sanitizeChatkitServerError(exc)] });
                      // return;
                    }
                  }}
                />
              );
            }}
          </ChatManagerProps>
        )}
      </BottomLayout>
    </FlexOne>
  );
};

GameChatScreen.propTypes = {
  user: userPropTypes.user,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

GameChatScreen.defaultProps = {
  user: null,
};

export default withUser(GameChatScreen);
