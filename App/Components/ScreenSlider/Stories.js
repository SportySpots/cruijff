import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'
import Footer from './Footer'
import ScreenSlider from './index'
import ContinueButton from './ContinueButton'

const data = [1, 2, 3]
const colors = ['#f00', '#f00', '#0f0', '#00f']

storiesOf('Screenslider')
  .add('Footer', () => <Footer numPages={5} currentPage={2} />)
  .add('ContinueButton', () => (
    <View style={{ backgroundColor: '#000', width: 100 }}>
      <ContinueButton text='continue' />
    </View>
  ))
  .add('ScreenSlider', () => (
    <ScreenSlider
      data={data}
      style={{ flex: 1 }}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            backgroundColor: colors[item]
          }}
        />
      )}
    />
  ))
