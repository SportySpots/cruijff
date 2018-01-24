import React from 'react'

import {View, StyleSheet, Text} from 'react-native'
import Fonts from '../../Themes/Fonts'
import Colors from '../../Themes/Colors'
import Footer from './Footer'

export default props =>
  <View style={styles.container}>
    <View style={{flexGrow: 1}}>
      <Text style={styles.title}>Hi Sport!</Text>
      <Text style={styles.paragraph}>
        Thanks for joining the yet to become biggest free sportclub in the world.
        Happy sporting!
      </Text>
    </View>
    <Footer />
  </View>

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    ...Fonts.style.L,
    color: Colors.white,
    textAlign: 'center',
    marginHorizontal: 50,
    marginBottom: 50
  },
  paragraph: {
    ...Fonts.style.M,
    color: Colors.white,
    textAlign: 'center',
    marginHorizontal: 50
  }

})
