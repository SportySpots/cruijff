import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import { store } from './mocks';
import CancelGameForm from '.';

storiesOf('Games.CancelGameForm', module)
  .add('CancelGameForm', () => (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <Query
          query={GET_GAME_DETAILS}
          variables={{ uuid: 455 }}
        >
          {({ loading, error, data }) =>
            (loading || error ? null : (
              <CancelGameForm
                game={data.game}
              />
            ))
          }
        </Query>
      </Provider>
    </View>
  ));
