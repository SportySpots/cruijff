import React, { useContext, useEffect, useRef } from 'react';
import moment from 'moment';
import styled from 'styled-components/native';
import { LocationContext } from '../../../Context/Location';
import GET_GAMES_LIST from '../../../GraphQL/Games/Queries/GET_GAMES_LIST';
import GamesList from '../../../Components/Games/GamesList';
import NoGamesFound from '../../../Components/Games/NoGamesFound';
import curatedGames from './utils';
import { NavigationContext } from 'react-navigation';
import { useQuery } from '@apollo/react-hooks';
import { gameEventEmitter, GameEvents } from '../../../Services/GameEvents';
import { QueryResult } from 'react-apollo';

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

const GamesListScreen = () => {
  const { locationMapCoords } = useContext(LocationContext);
  const coords = locationMapCoords;
  const navigation = useContext(NavigationContext);

  const maxDistance = 20;

  const getVariables = () => ({
    offset: (data && data.games && data.games.length) || 0,
    limit: 10,
    ordering: 'start_time',
    start_time__gte: moment().startOf('day').toISOString(),
    distance: `${parseInt((1000 * maxDistance) as any, 10)}:${coords.latitude}:${coords.longitude}`,
  });

  const query: QueryResult = useQuery(GET_GAMES_LIST, { variables: getVariables(), fetchPolicy: 'cache-and-network'});
  const requery = () => { query.data = null; query.refetch(getVariables()); };
  React.useEffect(requery, [locationMapCoords]);

  const { loading, data, refetch, fetchMore } = query;

  const handleGamePress = (game) => {
    navigation.navigate('GameDetailsScreen', { uuid: game.uuid });
  };

  const loadMore = () => {
    // fetch new games, append to current list.
    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) =>
        fetchMoreResult
          ?  { ...prev, games: { ...prev.games, ...fetchMoreResult.games} }
          : prev,
    });
  };

  const gameCreatedListener = useRef(() => { requery(); });

  useEffect(() => {
    gameEventEmitter.addListener(GameEvents.GAME_CREATED, gameCreatedListener.current);
    return function cleanup() {
      gameEventEmitter.removeListener(GameEvents.GAME_CREATED, gameCreatedListener.current)
    };
  }, []);

  return (
    <Container testID="GameListScreen">
      <GamesList
        games={(data && data.games && curatedGames(data.games)) || []}
        onCardPress={handleGamePress}
        nothingFoundComp={NoGamesFound}
        // FlatList props
        onRefresh={refetch}
        refreshing={loading}
        onEndReached={data && data.games && data.games.length > 3 ? loadMore : () => null}
        onEndReachedThreshold={0.1}
      />
    </Container>
  );
};

export default GamesListScreen;
