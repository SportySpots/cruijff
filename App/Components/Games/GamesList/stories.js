import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Query } from 'react-apollo';
import Colors from '../../../Themes/Colors';
import GET_GAMES_LIST from '../../../GraphQL/Games/Queries/GET_GAMES_LIST';
import Block from '../../Common/Block';
import GameListCard from '../../Games/GameListCard';
import GamesList from './index';

const Container = () => (
  <Query query={GET_GAMES_LIST}>
    {({ loading, error, data }) =>
    (loading || error ? null : (
      <Block bgColor={Colors.lightGray}>
        <GamesList
          games={data.games || []}
          cardComponent={GameListCard}
          onCardPress={() => {}}
        />
      </Block>
    ))}
  </Query>
);

storiesOf('Games.GamesList', module)
  .add('GamesList', () => <Container />);
