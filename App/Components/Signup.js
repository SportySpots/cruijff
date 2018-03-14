import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import styles from './Styles/RoundedButtonStyles'
import Colors from '../Themes/Colors'
import Logo from './Logo'
import Text from './Text'

export default class RoundedButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object
  }

  render () {
    return (
      <View style={style.container}>
        <View style={style.skew} />
        <View style={style.logoContainer}>
          <Logo />
          <Text.L style={style.logoText}>SPORTYSPOTS</Text.L>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryGreen,
    alignItems: 'center',
    justifyContent: 'center'
  },
  skew: {
    position: 'absolute',
    height: 200,
    width: 1000,
    left: -500,
    top: 0,
    backgroundColor: Colors.secondaryDarkBlueGreen,
    transform: [{ rotate: '-10deg' }]
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    color: Colors.white
  }
})
