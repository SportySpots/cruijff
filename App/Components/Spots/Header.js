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
  font-size: 19px;
`;

const Subtitle = styled(Text.S)`
  font-size: 14px;
`;

const Header = ({ spot, ...props }) => (
  <View {...props}>
    <Title>{spot.name}</Title>
    <View style={header.belowName}>
      {false && <Rating rating={spot.rating || 4} />}
      {false && <Spacer />}
      <Subtitle>{Int18n.t(spot.sports[0].category)}</Subtitle>
      {false && <Spacer />}
      {false && <Text.S>5 km</Text.S>}
      {spot.spot_games &&
        spot.spot_games.length > 0 && [
          <Spacer key={1} />,
          <Subtitle key={2} style={header.plannedGamesCount}>
            {spot.spot_games.length} {Int18n.t('games')}
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
    spot_games: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Header;
