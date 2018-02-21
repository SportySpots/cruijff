import React, { Component } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

import FieldBackground from './FieldBackground'
import Logo from './Logo'
import RoundedButton from './RoundedButton'
import styles from '../Containers/Styles/SplashScreenStyles'

export default class SplashScreen extends Component {
  render () {
    const { navigate } = this.props.navigation

    return (
      <FieldBackground>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.facebookActionContainer}>
          <RoundedButton onPress={() => this.props.facebookLogin()}>
            Login using Facebook
          </RoundedButton>
        </View>
        <View style={styles.skipActionContainer}>
          <TouchableHighlight onPress={() => navigate('OnboardingScreen')}>
            <Text>I'll do this later</Text>
          </TouchableHighlight>
        </View>
      </FieldBackground>
    )
  }
}
