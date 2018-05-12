import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Colors from '../Themes/Colors';
import Fonts from '../Themes/Fonts';

export default class Rating extends React.Component {
  static propTypes = {
    rating: PropTypes.number,
  };
  render() {
    return (
      <View style={style.container}>
        {[1, 2, 3, 4, 5].map(i => (
          <View key={i} style={[style.circle, i <= this.props.rating && style.full]} />
        ))}
        <Text.S style={style.text}>{this.props.rating.toFixed(1)}/5.0</Text.S>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 8,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: Colors.black54,
  },
  full: {
    backgroundColor: Colors.primaryGreen,
  },
  text: {
    ...Fonts.style.S,
    marginLeft: 8,
    color: Colors.black,
  },
});
