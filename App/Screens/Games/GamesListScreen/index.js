import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components/native';
import { locationPropTypes, withLocation } from '../../../Context/Location';
import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';
import GET_GAMES_LIST from '../../../GraphQL/Games/Queries/GET_GAMES_LIST';
import GamesList from '../../../Components/Games/GamesList';
import NoGamesFound from '../../../Components/Games/NoGamesFound';
import curatedGames from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  padding: 0 8px;
  background-color: ${({ theme }) => theme.colors.concrete};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class GamesListScreen extends React.Component {
  handleGamePress = (game) => {
    const { navigation } = this.props;
    navigation.navigate('GameDetailsScreen', { uuid: game.uuid });
  }

  render() {
    const { locationCoords } = this.props;
    const coords = locationCoords;

    const maxDistance = 20; // km // TODO: read from context

    const variables = {
      offset: 0,
      limit: 10,
      ordering: 'start_time',
      start_time__gte: moment().startOf('day').toISOString(),
      distance: `${parseInt(1000 * maxDistance, 10)}:${coords.latitude}:${coords.longitude}`,
    };

    return (
      <QueryCatchErrors
        query={GET_GAMES_LIST}
        variables={variables}
        fetchPolicy="cache-and-network"
      >
        {({
          loading,
          data,
          refetch,
          fetchMore,
        }) => {
          const loadMore = () => {
            fetchMore({
              variables: {
                offset: (data && data.games && data.games.length) || 0,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                  games: [...prev.games, ...fetchMoreResult.games],
                });
              },
            });
          };

          return (
            <Container testID="GameListScreen">
              <GamesList
                games={(data && data.games && curatedGames(data.games)) || []}
                onCardPress={this.handleGamePress}
                nothingFoundComp={NoGamesFound}
                // FlatList props
                onRefresh={refetch}
                refreshing={loading}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
              />
            </Container>
          );
        }}
      </QueryCatchErrors>
    );
  }
}

GamesListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  locationCoords: locationPropTypes.locationCoords.isRequired,
};

export default withLocation(GamesListScreen);
