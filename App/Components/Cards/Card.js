import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types'

import { distance } from '../../Transforms/Distance';

import styles from './Styles/CardStyles'

export default class Card extends Component {
  static defaultProps = { style: {} }

  static propTypes = {
    location: PropTypes.object,
    style: PropTypes.number,
    spot: PropTypes.object
  }

  componentWillMount() {
    // this.distance = distance(
    //   this.props.location.coords.latitude,
    //   this.props.location.coords.longitude,
    //   this.props.spot.latitude,
    //   this.props.spot.longitude
    // ).toFixed(1);
  }

  render() {
    return (
      <View style={[this.props.style, styles.container]}>
        <View style={{
          flex: 5
        }}>
          <Image style={{
            flex: 1
          }} source={{
            uri: (this.props.spot.images && this.props.spot.images[0]) || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv2CxOJIZX-hrhUZzyBcZ8t3_aJ6Zo0VFvs_loZIEpl_SkXUWJ0JeLTf-A'
          }}/>
        </View>
        <View style={{
          flex: 3
        }}>
          <View style={styles.bottom}>
            <Text style={styles.name}>
              {this.props.spot.name}</Text>
            <View style={{
              flexDirection: 'row'
            }}>
              <Text style={styles.distanceText}>{this.distance}
                km</Text>
            </View>
          </View>
        </View>
        <View>
          <Image source={{
            uri: 'https://pbs.twimg.com/profile_images/3165824968/721ae4b725f6f5638b50527438f6901e.jpeg'
          }}/>
        </View>
      </View>
    );
  }
}
