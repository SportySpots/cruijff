import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../Block';
import ChatBubble from '.';

storiesOf('Common.ChatBubble', module)
  .add('ChatBubble PRIMARY', () => (
    <Block>
      <ChatBubble
        primary
        position="right"
        title="Jannis Teunissen"
        text="Hey jongens, hoe laat begint het nu precies? Ik begreep van Karel dat Jan nog op zoek is naar voetbalschoenen.
        Ik kan wel een extra paar meenmemen of Sjors kan de voetbaltas meenemen want daar zitten sokken in."
        date="10:13"
      />
    </Block>
  ))
  .add('ChatBubble PRIMARY no title', () => (
    <Block>
      <ChatBubble
        primary
        position="right"
        text="Ok prima dan neem ik de voetbaltas mee"
        date="10:13"
      />
    </Block>
  ))
  .add('ChatBubble', () => (
    <Block bgColor="concrete">
      <ChatBubble
        title="Jannis Teunissen"
        text="Hey jongens, hoe laat begint het nu precies? Ik begreep van Karel dat Jan nog op zoek is naar voetbalschoenen.
        Ik kan wel een extra paar meenmemen of Sjors kan de voetbaltas meenemen want daar zitten sokken in."
        date="10:13"
      />
    </Block>
  ));
