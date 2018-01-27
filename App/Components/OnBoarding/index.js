import React from 'react'

import SlideNavigation from '../SlideNavigation/SlideNavigation'

import OnBoarding1 from './OnBoarding1'
import OnBoarding2 from './OnBoarding2'
import OnBoarding3 from './OnBoarding3'

import {StyleSheet, View} from 'react-native'
import Colors from '../../Themes/Colors'

const steps = [
  OnBoarding1,
  OnBoarding2,
  OnBoarding3
]

export default class OnBoarding extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <SlideNavigation components={steps} onDone={() => console.log('Onboarding done')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryGreen
  }
})
