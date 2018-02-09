import React, { Component } from 'react'
import { View } from 'react-native'

import FieldBackground from '../Components/FieldBackground'
import Logo from '../Components/Logo'

// Styles
import styles from './Styles/SplashScreenStyles'

export default class SplashScreen extends Component {
  render () {
    return (
      <FieldBackground>
        <View style={styles.container}>
          <Logo />
        </View>
      </FieldBackground>
    )
  }
}
