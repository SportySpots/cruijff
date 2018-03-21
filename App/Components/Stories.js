import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import NavBar from './NavBar'
import NavBarButton from './NavBarButton'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import './ScreenSlider/Stories'
import './Rating.story'
import './SpotCards/Stories'
import './Plan/Stories'
import './Profile/Stories'
import './DarkFooter/Stories'

import Onboarding from './Onboarding'
import ImageSwiper from './ImageSwiper'
import BackButton from './BackButton'
import BasicButton from './BasicButton'
import BigButton from './BigButton'
import Checkbox from './Checkbox'
import Text from './Text'
import Logo from './Logo'
import NavDots from './NavDots'
import FieldBackground from './FieldBackground'
import Slider from './Slider'
import SplashScreen from './SplashScreen'

const dummyNavigator = {
  navigate: () => null
}

storiesOf('Logo').add('Default', () => <Logo />)

storiesOf('Basic components')
  .add('BackButton', () => (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <BackButton text='back' />
    </View>
  ))
  .add('BasicButton', () => (
    <View style={{ backgroundColor: 'green', flex: 1 }}>
      <BasicButton
        style={{ width: 200 }}
        color='white'
        text='Im a basic button'
      />
    </View>
  ))
  .add('BigButton', () => (
    <View style={{ backgroundColor: 'green', flex: 1 }}>
      <BigButton bgColor='red' textColor='white' text='Im a big button' />
    </View>
  ))
  .add('Checkbox checked', () => (
    <View style={{ backgroundColor: 'green', flex: 1 }}>
      <Checkbox color='white' size={50} checked />
    </View>
  ))
  .add('Checkbox unchecked', () => (
    <View style={{ backgroundColor: 'green', flex: 1 }}>
      <Checkbox color='white' size={50} checked={false} />
    </View>
  ))

storiesOf('Text')
  .add('All sizes', () => (
    <View style={{ flex: 1, marginLeft: 20 }}>
      <Text>Default size</Text>
      <Text.S>Small size</Text.S>
      <Text.M>Medium size</Text.M>
      <Text.L>Large size</Text.L>
    </View>
  ))
  .add('Default text', () => <Text>Default size</Text>)
  .add('Small text', () => <Text.S>Small size</Text.S>)
  .add('Medium text', () => <Text.M>Medium size</Text.M>)
  .add('Large text', () => <Text.L>Large size</Text.L>)

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

const dummyReduxNav = {
  routes: [{ routeName: 'SpotSearchTab' }],
  index: 0
}

storiesOf('NavBar')
  .add('Default', () => <NavBar nav={dummyReduxNav} navigate={() => null} />)
  .add('NavBarButton', () => (
    <NavBarButton
      icon={{ set: MaterialIcon, name: 'settings' }}
      buttonText='test'
    />
  ))
  .add('At bottom', () => (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'red' }} />
      <NavBar nav={dummyReduxNav} navigate={() => null} />
    </View>
  ))

storiesOf('NavDots').add('Default', () => <NavDots count={5} active={3} />)
storiesOf('FieldBackground').add('Default', () => (
  <FieldBackground>
    <View />
  </FieldBackground>
))

storiesOf('Slider').add('Default', () => <Slider value={0.75} />)
storiesOf('SplashScreen').add('Default', () => (
  <SplashScreen navigation={dummyNavigator} />
))
