import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Int18n from '../../I18n';
import Rating from '../Rating';
import Text from '../Text';
import { header } from './Styles/CardStyles';
import Colors from '../../Themes/Colors';


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
