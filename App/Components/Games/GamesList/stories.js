import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import Colors from '../../../Themes/Colors';
import GET_GAMES_LIST from '../../../GraphQL/Games/Queries/GET_GAMES_LIST';
import Block from '../../Common/Block';
import GamesList from '.';

const Container = () => (
  <Query query={GET_GAMES_LIST}>
    {({ loading, error, data }) =>
      (loading || error ? null : (
        <Block bgColor={Colors.silver}>
          <GamesList
            games={data.games || []}
            onCardPress={() => {}}
          />
        </Block>
      ))}
  </Query>
);

storiesOf('Games.GamesList', module)
  .add('GamesList', () => <Container />);
