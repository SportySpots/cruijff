import React from 'react'
import { storiesOf } from '@storybook/react-native'
import OnBoarding1 from './OnBoarding1'
import OnBoardingBackground from './OnBoardingBackground'

storiesOf('OnBoarding')
  .add('Step 1', () => (
    <OnBoardingBackground><OnBoarding1 /></OnBoardingBackground>
  ))
