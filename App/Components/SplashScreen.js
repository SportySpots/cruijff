import React, { Component } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

import FieldBackground from './FieldBackground'
import Logo from './Logo'
import styles from './Styles/SplashScreenStyles'
import PropTypes from 'prop-types'
import BigButton from './BigButton'
import I18n from '../I18n'
import Colors from '../Themes/Colors'

export default class SplashScreen extends Component {
  static propTypes = {
    navigation: PropTypes.any
  }

  render () {
    const { navigate } = this.props.navigation

    return (
      <FieldBackground>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.buttonsContainer}>
          <BigButton
            onPress={() => navigate('SpotSearchTab')}
            text={I18n.t('Signup')}
            bgColor='blue'
            textColor='white'
          />
          <BigButton
            onPress={() => navigate('SpotSearchTab')}
            text={I18n.t('Already signed up?')}
            bgColor={Colors.transparent}
            textColor='white'
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
