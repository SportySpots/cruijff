import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import Colors from '../../../Themes/Colors';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import Block from '../Block';
import ChatMsg from '.';

const Container = props => (
  <Query
    query={GET_GAME_DETAILS}
    variables={{ uuid: '455' }}
  >
    {({ loading, error, data }) => (
      loading || error ? null : (
        <ChatMsg
          user={data.game.organizer}
          {...props}
        />
      ))
    }
  </Query>
);

storiesOf('Common.ChatMsg', module)
  .add('ChatMsg PRIMARY', () => (
    <Block>
      <Container
        primary
        position="right"
        title="Jannis Teunissen"
        text="Hey jongens, hoe laat begint het nu precies? Ik begreep van Karel dat Jan nog op zoek is naar voetbalschoenen.
        Ik kan wel een extra paar meenmemen of Sjors kan de voetbaltas meenemen want daar zitten sokken in."
        date="10:13"
      />
    </Block>
  ))
  .add('ChatMsg PRIMARY no title', () => (
    <Block>
      <Container
        primary
        position="right"
        text="Ok prima dan neem ik de voetbaltas mee"
        date="10:13"
      />
    </Block>
  ))
  .add('ChatMsg', () => (
    <Block bgColor="concrete">
      <Container
        title="Jannis Teunissen"
        text="Hey jongens, hoe laat begint het nu precies? Ik begreep van Karel dat Jan nog op zoek is naar voetbalschoenen.
        Ik kan wel een extra paar meenmemen of Sjors kan de voetbaltas meenemen want daar zitten sokken in."
        date="10:13"
      />
    </Block>
  ));
