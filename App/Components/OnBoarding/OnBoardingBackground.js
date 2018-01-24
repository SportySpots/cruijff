import React from 'react'

import { View, Dimensions, StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'

let fullWidth = Dimensions.get('window').width
let fullHeight = Dimensions.get('window').height

export default props =>
  <View style={styles.container}>
    <View style={[styles.container, styles.bgContainer]} />
    {props.children}
  </View>

const styles = StyleSheet.create({
  container: {
    width: fullWidth,
    height: fullHeight
  },
  bgContainer: {
    position: 'absolute',
    backgroundColor: Colors.darkGreen
  }
})
