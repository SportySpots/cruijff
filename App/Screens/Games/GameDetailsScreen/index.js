import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import moment from 'moment';
import { withUser, userPropTypes } from '../../../Context/User';
import I18n from '../../../I18n';
import client from '../../../GraphQL/ApolloClient';
import { addGlobalRef } from '../../../globalRefs';
import GET_GAMES_LIST from '../../../GraphQL/Games/Queries/GET_GAMES_LIST';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import NothingFound from '../../../Components/Common/NothingFound';
import GameDetails from '../../../Components/Games/GameDetails';
import locationStore from 'App/Stores/Location';
import {observer} from "mobx-react";

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled(ScrollView)`
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
@observer
class GameDetailsScreen extends React.PureComponent {
  get gameUUID() {
    const { navigation } = this.props;
    return navigation.state.params.uuid;
  }

  // Check whether or not the current user is involved in the game in any way
  // (attending or dropped out from the game)
  getUserRSVP = (game) => {
    const { user } = this.props;

    for (const attendee of game.attendees) {
      if (user && attendee.user.uuid === user.uuid) {
        return attendee;
      }
    }
    return null;
  };

  handleSpotPress = ({ spotUUID }) => {
    const { navigation } = this.props;
    navigation.navigate('SpotDetailsScreen', { uuid: spotUUID });
  }

  handleChatPress = roomId => () => {
    const { navigation } = this.props;
    navigation.navigate('GameChatScreen', { roomId });
  }

  handleAttendeesPress = () => {
    const { navigation } = this.props;
    navigation.navigate('GamePlayersScreen', { uuid: this.gameUUID });
  }

  handleRSVPLoggedOut = () => {
    const { navigation } = this.props;
    navigation.navigate('LoggedOutScreen');
  }

  render() {
    const { user } = this.props;
    const coords = locationStore.locationMapCoords;
    // Variables for refetching GET_GAMES_LIST query
    const maxDistance = 20; // km // TODO: read from context

    const variables = {
      offset: 0,
      limit: 10,
      ordering: 'start_time',
      start_time__gte: moment().startOf('day').toISOString(),
      distance: `${parseInt(1000 * maxDistance, 10)}:${coords.latitude}:${coords.longitude}`,
    };

    return (
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: this.gameUUID }}
        fetchPolicy="cache-and-network"
      >
        {({
          loading,
          error,
          data,
          refetch,
        }) => {
          if (loading) { return <CenteredActivityIndicator />; }
          if (error || !data || !data.game) {
            return (
              <NothingFound
                iconSet="MaterialCommunityIcons"
                iconName="calendar-plus"
                text={I18n.t('gameDetailsScreen.notFound')}
              />
            );
          }

          const userRSVP = this.getUserRSVP(data.game);
          const userStatus = userRSVP ? userRSVP.status : null;

          addGlobalRef('gameData')(data.game);

          return (
            <Container testID="gameDetails">
              <GameDetails
                game={data.game}
                user={user}
                userRSVP={userRSVP}
                userStatus={userStatus}
                onSpotPress={this.handleSpotPress}
                onChatPress={this.handleChatPress(data.game.chatkit_room_id.toString())}
                onAttendeesPress={this.handleAttendeesPress}
                onRSVPLoggedOut={this.handleRSVPLoggedOut}
                onRSVPSuccess={async () => {
                  refetch();
                  await client.query({
                    query: GET_GAMES_LIST,
                    variables,
                    fetchPolicy: 'network-only',
                  });
                }}
              />
            </Container>
          );
        }}
      </Query>
    );
  }
}

GameDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  user: userPropTypes.user,
};

GameDetailsScreen.defaultProps = {
  user: null,
};

export default withUser(GameDetailsScreen);
