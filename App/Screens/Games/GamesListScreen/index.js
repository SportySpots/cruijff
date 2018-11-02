import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
// import { View } from 'react-native';
import moment from 'moment';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import GET_GAMES_LIST from '../../../GraphQL/Games/Queries/GET_GAMES_LIST';
import GamesList from '../../../Components/Games/GamesList';
import curatedGames from './utils';
// import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  padding: 0 8px;
  background-color: ${Colors.concrete};
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
    const variables = {
      offset: 0,
      limit: 100,
      ordering: 'start_time',
      start_time__gte: moment().startOf('day').toISOString(),
    };

    return (
      <Query
        query={GET_GAMES_LIST}
        variables={variables}
        fetchPolicy="network-only"
      >
        {({
          error,
          loading,
          data,
          refetch,
          // fetchMore,
        }) => {
          if (error) {
            console.log('error', error);
            return null;
          }

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

          return (
            <Container testID="GameListScreen">
              <GamesList
                games={(data && data.games && curatedGames(data.games)) || []}
                onCardPress={this.handleGamePress}
                // FlatList props
                onRefresh={refetch}
                refreshing={loading}
              />
            </Container>
          );
        }}
      </Query>
    );
  }
}

GamesListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default GamesListScreen;
