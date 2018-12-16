import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import GET_GAME_USERS_LIST from '../../../GraphQL/Games/Queries/GET_GAME_USERS_LIST';
import Text from '../../../Components/Common/Text';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import PlayersTabs from '../../../Components/Games/PlayersTabs';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PlayersListScreen = ({ navigation }) => (
  <Query
    query={GET_GAME_USERS_LIST}
    variables={{ uuid: navigation.state.params.uuid }}
  >
    {({ loading, error, data }) => {
      if (loading) return <CenteredActivityIndicator />;
      if (error) return <Text>{JSON.stringify(error)}</Text>;

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
);

PlayersListScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default PlayersListScreen;
