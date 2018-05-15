import gql from 'graphql-tag';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import styled from 'styled-components';
import GameListCard from '../../Components/Games/GameListCard';
import MonthSelector from '../../Components/Games/MonthSelector';
import withQuery from '../../GraphQL/withQuery';


const CardContainer = (props) => {
  const { style, onPress, ...otherProps } = props;
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <GameListCard {...otherProps} />
    </TouchableOpacity>
  );
};

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

    const Contents = withQuery(GET_GAMES_LIST)(({ data }) => (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data.games.filter(game => game.spot)}
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
    ));
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

export const GET_GAMES_LIST = gql`
  #  query games($minStartTime: String!, $maxStartTime: String!) {
  query games {
    games {
      #      maxStartTime: $maxStartTime #      minStartTime: $minStartTime #      orderBy: "startTime" #      isListed: true
      uuid
      name
      start_time
      end_time
      is_featured
      show_remaining
      capacity
      sport {
        category
      }
      spot {
        uuid
        name
        images {
          image
        }
        amenities {
          sport {
            category
          }
          data
        }
        sports {
          category
        }
        address {
          lat
          lng
        }
      }
      attendees {
        status
        user {
          name
        }
      }
    }
  }
`;

const Container = styled(MenuProvider)`
  margin-left: 8px;
  margin-right: 8px;
  flex: 1;
`;

const GameListCardContainer = styled(CardContainer)`
  margin-bottom: 8px;
`;
