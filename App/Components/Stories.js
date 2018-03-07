import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import NavBar from './NavBar'
import NavBarButton from './NavBarButton'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import GamePlanScreen from './Plan/SportAndTime'

import './FieldBackground.story'
import './Logo.story'
import './ScreenSlider/Stories.js'
import './Rating.story'
import './Cards/Cards.story'

import Onboarding from './Onboarding'
import ImageSwiper from './ImageSwiper'
import ProfileDetailsScreen from './ProfileDetailsScreen'
import ProfileEditScreen from './ProfileEditScreen'
import ProfileLoginScreen from './ProfileLoginScreen'

const dummyNavigator = {
  navigate: () => null
}

storiesOf('Onboarding').add('Default', () => (
  <Onboarding navigation={dummyNavigator} />
))

storiesOf('ImageSwiper').add('Default', () => (
  <ImageSwiper
    images={[
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv2CxOJIZX-hrhUZzyBcZ8t3_aJ6Zo0VFvs_loZIEpl_SkXUWJ0JeLTf-A',
      'http://via.placeholder.com/350x150'
    ]}
  />
))

storiesOf('NavBar')
  .add('Default', () => <NavBar />)
  .add('NavBarButton', () => (
    <NavBarButton
      icon={{ set: MaterialIcon, name: 'settings' }}
      buttonText='test'
    />
  ))
  .add('At bottom', () => (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'red' }} />
      <NavBar />
    </View>
  ))

const facebookState = {
  status: 'SUCCESS',
  data: {
    profile: {
      name: 'Tom Klaver'
    },
    token: {
      userID: '1074120194'
    }
  }
}

storiesOf('Profile')
  .add('Detail', () => (
    <View style={{ flex: 1 }}>
      <ProfileDetailsScreen
        navigation={dummyNavigator}
        facebook={facebookState}
      />
    </View>
  ))
  .add('Edit', () => (
    <View style={{ flex: 1 }}>
      <ProfileEditScreen navigation={dummyNavigator} facebook={facebookState} />
    </View>
  ))
  .add('Login', () => (
    <View style={{ flex: 1 }}>
      <ProfileLoginScreen navigation={dummyNavigator} />
    </View>
  ))

storiesOf('Plan').add('Default', () => (
  <View style={{ flex: 1 }}>
    <GamePlanScreen />
  </View>
))
