import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import styled from 'styled-components';
import Colors from '../../Themes/Colors';
import GET_GAMES_LIST from '../../GraphQL/Games/Queries/GET_GAMES_LIST';
import Text from '../../Components/Text';
import GamesList from '../../Components/Games/GamesList';
import Card from '../../Components/Games/GameListCard';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled(View)`
  flex: 1;
  padding: 8px;
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const curatedGames = games => (
  games && games.length > 0 ? games.filter(game => game.spot) : []
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
    return (
      <Query
        query={GET_GAMES_LIST}
        variables={{
          offset: 0,
          limit: 20,
          ordering: 'start_time',
        }}
        fetchPolicy="cache-and-network"
      >
        {({
          loading,
          error,
          data,
          refetch,
          fetchMore,
        }) => {
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

          const loadMore = () => {
            fetchMore({
              variables: {
                offset: curatedGames(data.games).length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                  games: [...curatedGames(prev.games), ...curatedGames(fetchMoreResult.games)],
                });
              },
            });
          };

          return (
            <Container>
              <GamesList
                games={(data && curatedGames(data.games)) || []}
                cardComponent={Card}
                onCardPress={this.handleCardPress}
                // FlatList props
                onRefresh={refetch}
                refreshing={loading}
                onEndReached={loadMore}
                onEndReachedThreshold={1}
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


/*
import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import styled from 'styled-components';
import GameListCard from '../../Components/Games/GameListCard';
import MonthSelector from '../../Components/Games/MonthSelector';
import withQuery from '../../GraphQL/withQuery';
import I18n from '../../I18n';
import Colors from '../../Themes/Colors';
import GET_GAMES_LIST from '../../GraphQL/Games/Queries/GET_GAMES_LIST';
import NothingFound from '../../Components/NothingFound';
// import { Query } from 'react-apollo';
// import Text from '../../Components/Text';

const CardContainer = (props) => {
  const { style, onPress, ...otherProps } = props;
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <GameListCard {...otherProps} />
    </TouchableOpacity>
  );
};

const Container = styled(MenuProvider)`
  flex: 1;
  /* padding-left: 8px;
  padding-right: 8px;
  padding-top: 32px; //
  padding: 8px;
  background-color: ${Colors.white};
`;

const GameListCardContainer = styled(CardContainer)`
  margin-bottom: 8px;
`;

/* Get the min / max date for month `month`. Past months will change to future months //
const getMonthRange = (month) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  return {
    minDate: new Date(month < currentMonth ? currentYear + 1 : currentYear, month, 0),
    maxDate: new Date(month < currentMonth ? currentYear + 1 : currentYear, month + 1, 0),
  };
};

export default class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: new Date().getMonth(),
    };
  }
  render() {
    const monthRange = getMonthRange(this.state.month);

    const Contents = withQuery(GET_GAMES_LIST)(({ data, refetch, loading }) => {
      const gamesForList = data.games ? data.games.filter(game => game.spot) : [];
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={gamesForList}
          refreshing={loading}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={<NothingFound icon="cancel" text={I18n.t('No games found')} />}
          onRefresh={() => console.log('refetch') || refetch()}
          renderItem={({ item }) => (
            <GameListCardContainer
              game={item}
              onPress={() =>
                this.props.navigation.navigate('GameDetailsScreen', {
                  uuid: item.uuid,
                })
              }
            />
          )}
          keyExtractor={item => item.uuid}
        />
      );
    });
    return (
      <Container>
        {false && (
          <MonthSelector
            style={{ marginBottom: 16 }}
            month={this.state.month}
            onChange={month => this.setState({ month })}
          />
        )}
        <Contents
          variables={{
            minStartTime: monthRange.minDate,
            maxStartTime: monthRange.maxDate,
          }}
        />
      </Container>
    );
  }
}
*/
