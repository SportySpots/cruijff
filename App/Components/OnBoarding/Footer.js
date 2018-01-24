import React from 'react'

import {View, StyleSheet, Dimensions} from 'react-native'
import Fonts from '../../Themes/Fonts'
import Colors from '../../Themes/Colors'

let fullWidth = Dimensions.get('window').width

export default props =>
  <View style={styles.container} />

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: fullWidth,
    backgroundColor: Colors.black
  },
  title: {
    ...Fonts.style.L
  }

})
