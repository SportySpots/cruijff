/* Card component, this is the Card that is used in a list of many Cards */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from 'react-native-config/index';
import { Image, View } from 'react-native';
import Rating from '../Common/Rating';
import Text from '../Common/Text';
import { cardSmall } from './Styles/CardStyles';

const Spacer = () => <Text style={{ marginLeft: 8, marginRight: 8 }}>·</Text>;

const distance = 1.3;

export default class SpotListCardSmall extends Component {
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

  static getImageUrl = (image) => {
    if (image.startsWith('http')) {
      return image;
    }
    return Config.SEEDORF_HOST + image;
  }

  render() {
    const spot = this.props.spot;
    let image = 'https://via.placeholder.com/350x150';
    if (spot.images.length > 0) {
      image = SpotListCardSmall.getImageUrl(spot.images[0].image);
    }

    return (
      <View style={[cardSmall.container, this.props.style]}>
        <View style={cardSmall.details}>
          <Text.M>{spot.name}</Text.M>
          { false &&
            <View style={{ flexDirection: 'row', paddingTop: 8 }}>
              <Rating rating={spot.rating || 4} />
              <Spacer />
              <Text.S>{distance.toFixed(1)} km</Text.S>
            </View>
          }
        </View>
        <Image style={cardSmall.image} source={{ uri: image }} />
      </View>
    );
  }
}
