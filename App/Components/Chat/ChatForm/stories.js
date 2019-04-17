import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
// import { Query } from 'react-apollo';
import Colors from '../../../Themes/Colors';
// import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import ChatForm from '.';

storiesOf('Chat.ChatForm', module)
  .add('ChatForm', () => (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.concrete,
      }}
    >
      <ChatForm />
    </View>
  ));
