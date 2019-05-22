import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import GET_GAME_USERS_LIST from '../../../GraphQL/Games/Queries/GET_GAME_USERS_LIST';
import PlayersTabs from '.';

storiesOf('Games.PlayersTabs', module)
  .add('PlayersTabs', () => (
    <Query
      query={GET_GAME_USERS_LIST}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        const attendees = data.game.attendees.filter(attendee => attendee.status === 'ATTENDING');
        const absents = data.game.attendees.filter(attendee => attendee.status === 'DECLINED');

        return (
          <View style={{ flex: 1 }}>
            <PlayersTabs
              attendees={attendees}
              absents={absents}
            />
          </View>
        );
      }}
    </Query>
  ));
