import React from 'react'
import { storiesOf } from '@storybook/react-native'
import AskLocation from './AskLocation'
import { StyleSheet, View } from 'react-native'
import Colors from '../../Themes/Colors'

storiesOf('Ask Location').add('default', () => (
  <View style={styles.container}>
    <AskLocation />
  </View>
))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryGreen
  }
})
