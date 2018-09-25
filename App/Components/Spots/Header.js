import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import moment from 'moment';
import styled from 'styled-components/native';
import I18n from '../../I18n';
import Rating from '../Common/Rating';
import Text from '../Common/Text';
import { header } from './Styles/CardStyles';
import Colors from '../../Themes/Colors';

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
const Header = ({ spot, ...props }) => {
  // Don't consider passed games
  const { games: rawGames } = spot;
  const games = (rawGames && curatedGames(rawGames)) || [];

  return (
    <View {...props}>
      <Title>{spot.name}</Title>
      <View style={header.belowName}>
        {false && <Rating rating={spot.rating || 4} />}
        {false && <Spacer />}
        <Subtitle>{spot.sports.map(sport => I18n.t(sport.category)).join(', ')}</Subtitle>
        {spot.distance && <Spacer />}
        {spot.distance && <Subtitle>{spot.distance} km</Subtitle>}
        {games.length > 0 && [
          <Spacer key={1} />,
          <Subtitle key={2} style={header.plannedGamesCount}>
            {games.length} {I18n.t('games')}
          </Subtitle>,
        ]}
      </View>
    </View>
  );
};

Header.propTypes = {
  spot: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    sports: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string.isRequired,
    })),
    games: PropTypes.arrayOf(PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      start_time: PropTypes.string.isRequired,
    })),
    distance: PropTypes.number,
  }).isRequired,
};

export default Header;


const Spacer = () => (
  <SpacerContainer>
    <Text.SM style={{ color: Colors.shade }}>·</Text.SM>
  </SpacerContainer>
);

const SpacerContainer = styled.View`
  margin-horizontal: 4px;
`;

const Title = styled(Text.M)`
  font-size: 22px;
`;

const Subtitle = styled(Text.SM)`
`;
