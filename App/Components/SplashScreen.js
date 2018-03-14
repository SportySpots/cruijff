import React, { Component } from 'react'
import { Text, TouchableHighlight, View, Share } from 'react-native'

import FieldBackground from './FieldBackground'
import Logo from './Logo'
import styles from '../Containers/Styles/SplashScreenStyles'
import BasicButton from './BasicButton'

export default class SplashScreen extends Component {
  render () {
    const { navigate } = this.props.navigation

    return (
      <FieldBackground>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.facebookActionContainer}>
          <BasicButton
            onPress={() => this.props.facebookLogin()}
            text='Login using Facebook'
            color='white'
          />
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
