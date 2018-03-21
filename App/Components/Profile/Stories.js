import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import ProfileDetailsScreen from './ProfileDetailsScreen'
import ProfileEditScreen from './ProfileEditScreen'
import ProfileLoginScreen from './ProfileLoginScreen'

const dummyNavigator = {
  navigate: () => null
}

const userState = {
  firstName: 'Sezayi',
  lastName: 'Arslan',
  age: 31,
  level: 0.75
}

const userStateNotLoggedIn = {}

storiesOf('Profile')
  .add('Detail', () => (
    <View style={{ flex: 1 }}>
      <ProfileDetailsScreen navigation={dummyNavigator} user={userState} />
    </View>
  ))
  .add('Edit', () => (
    <View style={{ flex: 1 }}>
      <ProfileEditScreen navigation={dummyNavigator} user={userState} />
    </View>
  ))
  .add('Login', () => (
    <View style={{ flex: 1 }}>
      <ProfileLoginScreen
        navigation={dummyNavigator}
        user={userStateNotLoggedIn}
      />
    </View>
  ))
