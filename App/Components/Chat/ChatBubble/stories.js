import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../../Common/Block';
import ChatBubble from '.';

storiesOf('Chat.ChatBubble', module)
  .add('ChatBubble RIGHT', () => (
    <Block bgColor="silver" style={{ height: 100 }}>
      <ChatBubble
        position="right"
        user={{ _id: 1 }}
        currentMessage={{
          user: {
            _id: 1,
          },
          text: 'Im the text msg',
        }}
      />
    </Block>
  ))
  .add('ChatBubble LEFT', () => (
    <Block bgColor="silver" style={{ height: 100 }}>
      <ChatBubble
        position="left"
        user={{ _id: 1 }}
        currentMessage={{
          user: {
            _id: 2, // other user, not cuurently logged in
          },
          text: 'Im the text msg',
        }}
      />
    </Block>
  ));
