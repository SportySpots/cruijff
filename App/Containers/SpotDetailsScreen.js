import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

import Fonts from '../Themes/Fonts'

export default class SpotDetailsScreen extends Component {
  render () {
    const { navigate } = this.props.navigation
    const imgList = [
      'https://maps.amsterdam.nl/sport/Downloads/Botteskerksingel_2.jpg',
      'https://maps.amsterdam.nl/sport/Downloads/Steelvlietstraat_1.jpg',
      'https://maps.amsterdam.nl/sport/Downloads/Veldzicht.jpg'
    ]
    return (
      <View>
        <Image
          resizeMode='cover'
          style={{
            width: null,
            height: 200
          }}
          source={{ uri: imgList[0] }}
        />
        <Text style={Fonts.style.h4}>Spot Name</Text>
        <Text>Football</Text>
        <Text>5 Games</Text>
      </View>
    )
  }
}
