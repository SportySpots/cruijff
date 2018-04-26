import React from 'react'
import { View } from 'react-native'

import { storiesOf } from '@storybook/react-native'
import ProfileDetailsScreen from './ProfileDetailsScreen'
import ProfileEditScreen from './ProfileEditScreen'
import ProfileLoginScreen from './ProfileLoginScreen'
import { Provider } from 'react-redux'

import { createStore } from 'redux'

const dummyNavigator = {
  navigate: () => null
}

const userStateNotLoggedIn = {}

const store = createStore(state => state, {
  user: {
    uuid: 1234,
    initialized: true
  }
})

storiesOf('Profile')
  .add('Detail', () => (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <ProfileDetailsScreen navigation={dummyNavigator} />
      </Provider>
    </View>
  ))
  .add('Edit', () => (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <ProfileEditScreen navigation={dummyNavigator} />
      </Provider>
    </View>
  ))
  .add('Login', () => (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <ProfileLoginScreen
          navigation={dummyNavigator}
          user={userStateNotLoggedIn}
        />
      </Provider>
    </View>
  ))
