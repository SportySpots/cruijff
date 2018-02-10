import React, { Component } from 'react'
import { View, Text } from 'react-native'

import FieldBackground from '../Components/FieldBackground'
import Logo from '../Components/Logo'
import RoundedButton from '../Components/RoundedButton'

// Styles
import styles from './Styles/SplashScreenStyles'

export default class SplashScreen extends Component {
  render () {
    const { navigate } = this.props.navigation

    return (
      <FieldBackground>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.facebookActionContainer}>
          <RoundedButton onPress={() => navigate('DefaultNav')}>
            Login using Facebook
          </RoundedButton>
        </View>
        <View style={styles.skipActionContainer}>
          <Text>Skip It... I'll do it later</Text>
        </View>
      </FieldBackground>
    )
  }
}
