import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import spotDetailsFragment from '../../../GraphQL/Spots/Fragments/spotDetails';
import Text from '../../Text';
import GamesList from '../../Games/GamesList';
import Card from '../../Games/GameListCard';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  min-height: 100px;
  padding: 16px;
`;
//------------------------------------------------------------------------------
const Title = styled(Text.M)`
  font-size: 22px;
`;
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
/**
 * @summary (This is a hack) filter passed games.
 */
const curatedGames = (games) => {
  const today = moment(new Date()).startOf('day').toISOString();

  return games && games.length > 0
    ? games.filter(game => game.start_time > today)
    : [];
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotGames extends React.PureComponent {
  handleCardPress = (gameId) => {
    this.props.navigation.navigate('GameDetailsScreen', {
      uuid: gameId,
    });
  }

  render() {
    const { spot } = this.props;
    const { games } = spot;

    return (
      <Container>
        {games && curatedGames(games).length > 0 && (
          <Title>{I18n.t('Games')}</Title>
        )}
        <GamesList
          games={(games && curatedGames(games)) || []}
          withEmptyComponent={false}
          cardComponent={Card}
          onCardPress={this.handleCardPress}
        />
      </Container>
    );
  }
}

SpotGames.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  spot: propType(spotDetailsFragment).isRequired,
};

export default withNavigation(SpotGames);
