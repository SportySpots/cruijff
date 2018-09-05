import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './Styles/Onboarding';

export default class Onboarding extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.any,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode="contain" source={this.props.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.paragraph}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}
