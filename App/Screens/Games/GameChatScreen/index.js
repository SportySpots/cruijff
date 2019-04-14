import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { withUser, userPropTypes } from '../../../Context/User';
import { TopLayout, BottomLayout } from '../../../Components/Layouts/FixedBottomLayout';
import ChatManagerProps from '../../../RenderProps/chat-manager-props';
import Block from '../../../Components/Common/Block';
import Spacer from '../../../Components/Common/Spacer';
import ChatMsg from '../../../Components/Common/ChatMsg';
import ChatForm from '../../../Components/Games/ChatForm';

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
  const handlerId = `game_${gameUUID}`;

  return (
    <FlexOne>
      <TopLayout>
        <Block>
          <ChatManagerProps handlerId={handlerId}>
            {({ loading, chatkitUser, messages }) => (
              messages.map((msg) => {
                const isSender = user && user.uuid && msg.senderId === `user_${user.uuid}`;
                return (
                  <View key={msg.id}>
                    <ChatMsg
                      title="Jannis Teunissen"
                      text={msg.text}
                      date={msg.createdAt}
                      primary={isSender}
                      position={isSender ? 'right' : 'left'}
                    />
                    <Spacer size="L" />
                  </View>
                );
              })
            )}
          </ChatManagerProps>
        </Block>
      </TopLayout>
      <BottomLayout>
        <ChatForm />
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
