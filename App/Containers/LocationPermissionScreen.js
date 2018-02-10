import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'

import RoundedButton from '../Components/RoundedButton'
import Images from '../Themes/Images'

import styles from './Styles/LocationPermissionScreenStyles'

export default class LocationPermissionScreen extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.illustrationContainer}>
          <Image source={Images.illustrationShareLocation} />
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>
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
