import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
//------------------------------------------------------------------------------
const Star = styled(Icon)`
  color: ${Colors.black54};
  padding-right: 10px;
`;
//------------------------------------------------------------------------------
const FullStar = styled(Icon)`
  color: ${Colors.primaryGreen};
  padding-right: 10px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Rating = ({ rating, onPress }) => (
  <Container>
    {[1, 2, 3, 4, 5].map((i) => {
      const IconComp = i <= rating ? FullStar : Star;
      return (
        <TouchableOpacity key={i} onPress={() => { onPress(i); }}>
          <IconComp name="stars" size={24} />
        </TouchableOpacity>
      );
    })}
  </Container>
);

Rating.propTypes = {
  rating: PropTypes.number,
  onPress: PropTypes.func,
};

Rating.defaultProps = {
  rating: 0,
  onPress: () => {},
};

export default Rating;
