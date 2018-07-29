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
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
/**
 * @summary (This is a hack) filter passed games.
 */
const curatedGames = (games) => {
  const today = moment(new Date()).startOf('day').toISOString();

  return games && games.length > 0
    ? games.filter(game => game.start_time > today && game.status !== 'DRAFT')
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
        <GamesContainer>
          <GamesList
            games={(games && curatedGames(games)) || []}
            withEmptyComponent={false}
            cardComponent={Card}
            onCardPress={this.handleCardPress}
          />
        </GamesContainer>
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

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  min-height: 100px;
`;
//------------------------------------------------------------------------------
const Title = styled(Text.M)`
  font-size: 22px;
  padding-horizontal: 16px;
  margin-top: 16px;
`;
//------------------------------------------------------------------------------
const GamesContainer = styled.View`
  padding-horizontal: 8px;
`;
