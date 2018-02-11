import React, { Component } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'

import RoundedButton from '../Components/RoundedButton'
import Images from '../Themes/Images'
import styles from './Styles/LocationPermissionScreenStyles'
import Fonts from '../Themes/Fonts'

export default class LocationPermissionScreen extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.illustrationContainer}>
          <Image source={Images.illustrationShareLocation} />
        </View>
        <View style={styles.section}>
          <Text style={Fonts.style.normal}>
            Sharing your location, helps us find sporty spots and sporty people
            near you.
          </Text>
        </View>
        <View style={styles.actionButtonContainer}>
          <RoundedButton>Share your location</RoundedButton>
        </View>
        <View style={styles.skipActionContainer}>
          <TouchableHighlight onPress={() => navigate('DefaultNav')}>
            <Text>I'll do this later</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
