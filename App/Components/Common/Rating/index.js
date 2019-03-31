import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Row from '../Row';
import Spacer from '../Spacer';
import Icon from '../Icon';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Rating = ({ rating, onPress }) => (
  <Row alignItems="center">
    {[1, 2, 3, 4, 5].map(i => [
      <TouchableOpacity
        key={`star-${i}`}
        onPress={() => { onPress(i); }}
      >
        <Icon
          iconSet="MaterialIcons"
          iconName="stars"
          size={24}
          color={i <= rating ? 'primaryGreen' : 'black34'}
        />
      </TouchableOpacity>,
      <Spacer row key={`spacer-${i}`} />,
    ])}
  </Row>
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
