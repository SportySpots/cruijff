import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import GameListCard from '.';

const Container = ({ mutate }) => (
  <View>
    <Query
      query={GET_GAME_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <GameListCard
            game={mutate(data.game)}
          />
        ))
      }
    </Query>
  </View>
);

Container.propTypes = {
  mutate: PropTypes.func,
};

Container.defaultProps = {
  mutate: g => g,
};

storiesOf('Games.GameListCard', module)
  .add('GameListCard PLANNED', () => (
    <Container mutate={g => Object.assign({}, g, { status: 'PLANNED' })} />
  ))
  .add('GameListCard PLANNED long title/name', () => (
    <Container mutate={g => Object.assign({}, g, { status: 'PLANNED', name: 'Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name' })} />
  ))
  .add('GameListCard CANCELED', () => (
    <Container mutate={g => Object.assign({}, g, { status: 'CANCELED' })} />
  ))
  .add('GameListCard PLANNED short title/name', () => (
    <Container mutate={g => Object.assign({}, g, { status: 'PLANNED', name: 'Some Short Name' })} />
  ))
  .add('GameListCard CANCELED long title/name', () => (
    <Container mutate={g => Object.assign({}, g, { status: 'CANCELED', name: 'Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name' })} />
  ));
