import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import GET_GAME_USERS_LIST from '../../../GraphQL/Games/Queries/GET_GAME_USERS_LIST';
import Text from '../../../Components/Common/Text';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import ChatForm from '../../../Components/Games/ChatForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameChatScreen = ({ navigation }) => (
  <Query
    query={GET_GAME_USERS_LIST}
    variables={{ uuid: navigation.state.params.uuid }}
  >
    {({ loading, error, data }) => {
      if (loading) return <CenteredActivityIndicator />;
      if (error) return <Text>{JSON.stringify(error)}</Text>;

      return (
        <View style={{ flex: 1 }}>
          <ChatForm />
        </View>
      );
    }}
  </Query>
);

GameChatScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default GameChatScreen;
