import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Int18n from '../../I18n';
import Rating from '../Rating';
import Text from '../Text';
import { header } from './Styles/CardStyles';

const Spacer = () => <Text style={header.spacer}>·</Text>;

const Title = styled(Text.M)`
  font-size: 22px;
`;

const Subtitle = styled(Text.S)`
  font-size: 16px;
`;

const Header = ({ spot, ...props }) => (
  <View {...props}>
    <Title>{spot.name}</Title>
    <View style={header.belowName}>
      {false && <Rating rating={spot.rating || 4} />}
      {false && <Spacer />}
      <Subtitle>{spot.sports.map(sport => Int18n.t(sport.category)).join(', ')}</Subtitle>
      {spot.distance && <Spacer />}
      {spot.distance && <Subtitle>{spot.distance} km</Subtitle>}
      {spot.games &&
        spot.games.length > 0 && [
          <Spacer key={1} />,
          <Subtitle key={2} style={header.plannedGamesCount}>
            {spot.games.length} {Int18n.t('games')}
          </Subtitle>,
        ]}
    </View>
  </View>
);

Header.propTypes = {
  spot: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    sports: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string.isRequired,
    })),
    games: PropTypes.arrayOf(PropTypes.object),
    distance: PropTypes.number,
  }).isRequired,
};

export default Header;
