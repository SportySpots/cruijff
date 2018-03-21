import React from 'react'
import Colors from '../../Themes/Colors'
import Fonts from '../../Themes/Fonts'
import { Text, View, StyleSheet } from 'react-native'

export default ({ text }) => (
  <View style={style.circle}>
    <Text style={style.text}>{text.toUpperCase()}</Text>
  </View>
)

const style = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: Colors.primaryGreen,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    ...Fonts.style.S,
    color: Colors.white,
    fontSize: 8,
    padding: 4,
    textAlign: 'center'
  }
})
