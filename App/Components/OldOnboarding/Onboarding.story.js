import React from 'react'
import { storiesOf } from '@storybook/react-native'
import OnBoarding from './index'
import OnBoarding1 from './OnBoarding1'
import OnBoarding2 from './OnBoarding2'
import OnBoarding3 from './OnBoarding3'
import { StyleSheet, View } from 'react-native'
import Colors from '../../Themes/Colors'

storiesOf('OnBoarding')
  .add('Flow', () => <OnBoarding />)
  .add('Step 1', () => (
    <View style={styles.container}>
      <OnBoarding1 />
    </View>
  ))
  .add('Step 2', () => (
    <View style={styles.container}>
      <OnBoarding2 />
    </View>
  ))
  .add('Step 3', () => (
    <View style={styles.container}>
      <OnBoarding3 />
    </View>
  ))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryGreen
  }
})
