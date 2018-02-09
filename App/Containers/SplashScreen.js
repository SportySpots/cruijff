import React, { Component } from 'react'
import { Image, View } from 'react-native'

import { Images } from '../Themes'

// Styles
import styles from './Styles/SplashScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode='stretch'
        />
        <Image source={Images.logo} style={styles.logo} />
      </View>
    )
  }
}
