import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../../Common/Block';
import ChatSend from '.';

storiesOf('Chat.ChatSend', module)
  .add('ChatSend', () => (
    <Block bgColor="white" style={{ height: 100 }}>
      <ChatSend />
    </Block>
  ));
