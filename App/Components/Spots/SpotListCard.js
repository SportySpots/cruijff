/* Card component, this is the Card that is used in a list of many Cards */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Config from 'react-native-config';
import Header from './Header';
import { card } from './Styles/CardStyles';

export default class SpotListCard extends Component {
  static propTypes = {
    spot: PropTypes.object,
    style: PropTypes.number,
  };

  /* forward setNativeProps to the root (View) so that Card can be used as Touchable */
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  };

  componentWillMount() {
    this.distance = 5;
  }

  getImageUrl = (image) => {
    if (image.startsWith('http')) {
      return image;
    }
    return Config.SEEDORF_HOST + image;
  }

  render() {
    const spot = this.props.spot;

    const image =
      spot.images.length > 0
        ? this.getImageUrl(spot.images[0].image)
        : 'https://raw.githubusercontent.com/SportySpots/cruijff/graphql/App/Images/spot-placeholder.png';

    return (
      <View style={[card.container, this.props.style]}>
        <Image style={card.image} source={{ uri: image }} />
        <Header spot={spot} style={card.bottom} />
      </View>
    );
  }
}
