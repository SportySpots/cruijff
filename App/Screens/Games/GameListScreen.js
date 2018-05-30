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
  padding-top: 32px; */
  padding: 8px;
  background-color: ${Colors.white};
`;

const GameListCardContainer = styled(CardContainer)`
  margin-bottom: 8px;
`;

/* Get the min / max date for month `month`. Past months will change to future months */
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
