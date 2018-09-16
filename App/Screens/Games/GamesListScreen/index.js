import React from 'react';
import PropTypes from 'prop-types';
// import { Query } from 'react-apollo';
// import { View } from 'react-native';
import { uniqBy } from 'ramda';
import moment from 'moment';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import GET_GAMES_LIST from '../../../GraphQL/Games/Queries/GET_GAMES_LIST';
import GamesList from '../../../Components/Games/GamesList';
import GameListCard from '../../../Components/Games/GameListCard';
import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  padding: 0 4px;
  background-color: ${Colors.concrete};
`;
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
/**
 * @summary (This is a hack) some of the games have no spot associated to them.
 * This is caused when the user visits the create game screen (an empty game is
 * created by default) and leaves without finishing the process.
 */
const curatedGames = games => (
  games && games.length > 0
    ? uniqBy(({ uuid }) => (uuid), games.filter(game => game.status !== 'DRAFT'))
    : []
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class GamesListScreen extends React.Component {
  handleCardPress = (gameId) => {
    this.props.navigation.navigate('GameDetailsScreen', {
      uuid: gameId,
    });
  }

  render() {
    const variables = {
      offset: 0,
      limit: 100,
      ordering: 'start_time',
      start_time__gte: moment(new Date()).startOf('day'),
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
          // fetchMore,
        }) =>
          /* const loadMore = () => {
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
          }; */

           (
             <Container testID="GameListScreen">
               <GamesList
                 games={(data && data.games && curatedGames(data.games)) || []}
                 cardComponent={GameListCard}
                 onCardPress={this.handleCardPress}
                // FlatList props
                 onRefresh={refetch}
                 refreshing={loading}
               />
             </Container>
          )
        }
      </QueryCatchErrors>
    );
  }
}

GamesListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default GamesListScreen;
