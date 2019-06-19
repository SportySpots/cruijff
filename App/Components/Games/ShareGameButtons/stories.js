import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import ShareGameButtons from '.';

storiesOf('Games.ShareGameButtons', module)
  .add('ShareGameButtons white theme', () => (
    <Query
      query={GET_GAME_DETAILS}
      variables={{ uuid: '455' }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <View style={{ flex: 1 }}>
            <ShareGameButtons shareLink={data.game.share_link} />
          </View>
        ))
      }
    </Query>
  ));
