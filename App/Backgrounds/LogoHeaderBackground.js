import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TextInput, ScrollView } from 'react-native'
import Colors from '../Themes/Colors'
import Logo from '../Components/Logo'
import Text from '../Components/Text'
import styled from 'styled-components'

export default class LogoHeaderBackground extends Component {
  render () {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <AbsoluteFull>
          <View style={style.skew} />
          <View style={style.logoContainer}>
            <Logo scale={1} />
            <Text.L style={style.logoText}>SPORTYSPOTS</Text.L>
          </View>
        </AbsoluteFull>
        <View style={{ flex: 1, marginTop: 160 }}>{this.props.children}</View>
      </View>
    )
  }
}

const AbsoluteFull = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`
const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  skew: {
    position: 'absolute',
    height: 100,
    width: 1000,
    left: -500,
    top: 0,
    backgroundColor: Colors.secondaryDarkBlueGreen,
    transform: [{ rotate: '-10deg' }]
  },
  logoContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    marginTop: 8,
    color: Colors.black
  }
})
