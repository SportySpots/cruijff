import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './ScreenSlider/Stories';
import './Spots/Stories';
import '../Screens/Plan/Stories';
import '../Screens/Profile/Stories';
import './DarkFooter/Stories';
import './Games/Stories';
import '../Backgrounds/Stories';

import NavBar from './NavBar';
import NavBarButton from './NavBarButton';
import Onboarding from './Onboarding';
import ImageSwiper from './ImageSwiper';
import BackButton from './BackButton';
import DefaultButton from './DefaultButton';
import SecondaryButton from './SecondaryButton';
import FlatButton from './FlatButton';
import RouteButton from './RouteButton';
import MapsButton from './MapsButton';
import Checkbox from './Checkbox';
import Check from './Check';
import Text from './Text';
import Logo from './Logo';
import NavDots from './NavDots';
import Slider from './Slider';
import { _SplashScreen as SplashScreen } from '../Screens/SplashScreen';
import Rating from './Rating';
import RatingBig from './RatingBig';
import PropertyCircle from './PropertyCircle';
import UserCircle from './UserCircle';
import SignupScreen from '../Screens/SignupScreen';
import LoginScreen from '../Screens/LoginScreen';
import InfoScreen from '../Screens/InfoScreen';
import FilterScreen from '../Screens/FilterScreen';
import NothingFound from './NothingFound';
import ActivityCard from './ActivityCard';

const dummyNavigator = {
  navigate: () => null,
};

const store = createStore(state => state, {
  user: {
    uuid: 1234,
    initialized: true,
  },
});

storiesOf('Logo')
  .add('Default', () => <Logo />);

storiesOf('Basic components')
  .add('BackButton', () => (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <BackButton text="back" />
    </View>
  ))
  .add('RouteButton', () => <RouteButton />)
  .add('MapsButton', () => <MapsButton />)
  .add('DefaultButton', () => <DefaultButton text="Press me please" />)
  .add('SecondaryButton', () => <SecondaryButton text="Press me please" />)
  .add('FlatButton', () => <FlatButton text="SUBMIT" />)
  .add('Checkbox', () => (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <Checkbox />
    </View>
  ))
  .add('Check', () => (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <Check />
    </View>
  ));

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
  .add('Large text', () => <Text.L>Large size</Text.L>);

storiesOf('Onboarding').add('Default', () => <Onboarding navigation={dummyNavigator} />);

storiesOf('ImageSwiper').add('Default', () => (
  <ImageSwiper
    images={[
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv2CxOJIZX-hrhUZzyBcZ8t3_aJ6Zo0VFvs_loZIEpl_SkXUWJ0JeLTf-A',
      'https://via.placeholder.com/350x150',
    ]}
  />
));

const dummyReduxNav = {
  routes: [{ routeName: 'SpotSearchTab' }],
  index: 0,
};

storiesOf('NavBar')
  .add('Default', () => (
    <Provider store={store}>
      <NavBar nav={dummyReduxNav} navigate={() => null} />
    </Provider>
  ))
  .add('NavBarButton', () => (
    <NavBarButton icon={{ set: MaterialIcon, name: 'info' }} buttonText="test" />
  ))
  .add('At bottom', () => (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <NavBar nav={dummyReduxNav} navigate={() => null} />
      </View>
    </Provider>
  ));

storiesOf('NavDots').add('Default', () => <NavDots count={5} active={3} />);

storiesOf('Rating')
  .add('1', () => <Rating rating={1} />)
  .add('3', () => <Rating rating={3} />)
  .add('4.5', () => <Rating rating={4.5} />);

storiesOf('RatingBig')
  .add('1', () => <RatingBig rating={1} />)
  .add('3', () => <RatingBig rating={3} />)
  .add('4.5', () => <RatingBig rating={4.5} />);

storiesOf('Slider').add('Default', () => <Slider value={0.75} />);
storiesOf('SplashScreen').add('Default', () => (
  <SplashScreen user={{ initialized: true }} navigation={dummyNavigator} />
));

storiesOf('PropertyCircle').add('Propertycircle', () => (
  <View>
    {['blablabla', 'ASD GDS ASD DAS', 'as asdasdasdsadassadas', '+4', 'HMMMM'].map((text, idx) => (
      <PropertyCircle text={text} key={idx} />
    ))}
  </View>
));

storiesOf('ActivityCard')
.add('ActivityCard', () => (
  <View>
    <ActivityCard />
  </View>
))

const users = require('../Fixtures/users');

storiesOf('UserCircle').add('UserCircle', () => (
  <View>{users.slice(0, 3).map((user, idx) => <UserCircle user={user} key={idx} />)}</View>
));
storiesOf('SignupScreen').add('Default', () => (
  <Provider store={store}>
    <SignupScreen navigation={dummyNavigator} />
  </Provider>
));
storiesOf('LoginScreen').add('Default', () => (
  <Provider store={store}>
    <LoginScreen navigation={dummyNavigator} />
  </Provider>
));
storiesOf('NothingFound').add('Default', () => (
  <NothingFound
    icon="map-marker"
    text="Oops, nothing found"
  />
));

storiesOf('FilterScreen').add('Default', () => (
  <FilterScreen navigation={dummyNavigator} />
));

storiesOf('InfoScreen').add('Default', () => (
  <InfoScreen />
));
