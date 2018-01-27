import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Footer from './Footer'

const navigationMock = {
  state: {
    index: 1,
    routes: [1, 2, 3]
  }
}

storiesOf('SlideNavigation')
  .add('Footer', () => (
    <Footer navigation={navigationMock} />
  ))
