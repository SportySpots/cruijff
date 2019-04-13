import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components/native';
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
const GameChatScreen = ({ navigation }) => (
  <FlexOne>
    <TopLayout>
      <Block>
        <ChatManagerProps roomId={navigation.state.params.uuid}>
          {({ loading, chatkitUser, messages }) => (
            messages.map(msg => (
              <View>
                <ChatMsg
                  title="Jannis Teunissen"
                  text={msg.text}
                  date="10:13"
                />
                <Spacer size="L" />
              </View>
            ))
          )}
        </ChatManagerProps>
      </Block>
    </TopLayout>
    <BottomLayout>
      <ChatForm />
    </BottomLayout>
  </FlexOne>
);

GameChatScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default GameChatScreen;
