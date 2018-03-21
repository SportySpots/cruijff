import React, { Component } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

import FieldBackground from './FieldBackground'
import Logo from './Logo'
import PropTypes from 'prop-types'
import BigButton from './BigButton'
import I18n from '../I18n'
import Colors from '../Themes/Colors'
import { ApplicationStyles, Metrics } from '../Themes'

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
            text={I18n.t('Signup with e-mail')}
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

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.large,
    width: Metrics.images.large
  },
  logoContainer: {
    ...ApplicationStyles.screen.container,
    flex: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  buttonsContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  skipActionContainer: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50
  }
})
