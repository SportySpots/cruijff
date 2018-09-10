import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import { WithApolloMockProvider } from '../../../GraphQL';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import Block from '../Block';
import SportCard from './index';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 455 },
  },
};

storiesOf('Common.SportCard', module)
  .add('SportCard', () => (
    <WithApolloMockProvider>
      <Query
        query={GET_SPORTS}
        variables={{ uuid: dummyNavigator.state.params.uuid }}
      >
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <Block>
              <SportCard sport={data.sports[0]} />
            </Block>
          ))
        }
      </Query>
    </WithApolloMockProvider>
  ));
