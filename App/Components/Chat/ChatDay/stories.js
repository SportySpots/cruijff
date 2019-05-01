import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../../Common/Block';
import ChatDay from '.';

storiesOf('Chat.ChatDay', module)
  .add('ChatDay', () => (
    <Block bgColor="white" style={{ height: 100 }}>
      <ChatDay
        user={{ _id: 1 }}
        currentMessage={{
          user: {
            _id: 1,
          },
          createdAt: '1970-01-01T00:00:00Z',
        }}
      />
    </Block>
  ));
