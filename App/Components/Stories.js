/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import NavBar from './Common/NavBar';
import NavBarButton from './Common/NavBar/NavBarButton';
import Onboarding from './Onboarding';
import ImageSwiper from './Common/ImageSwiper';
import DefaultButton from './Common/DefaultButton';
import SecondaryButton from './Common/SecondaryButton';
import FlatButton from './Common/FlatButton';
import Checkbox from './Common/Checkbox';
import Check from './Common/Check';
import Text from './Common/Text';
import Logo from './Common/Logo';
import NavDots from './Common/NavDots';
import Slider from './Common/Slider';
import Rating from './Common/Rating';
import RatingBig from './Common/RatingBig';
import PropertyCircle from './Common/PropertyCircle';
import UserCircle from './Common/UserCircle';
import SignupScreen from '../Screens/SignupScreen';
import NothingFound from './Common/NothingFound';

const dummyNavigator = {
  navigate: () => null,
  state: {
    index: 0,
    routes: [{ routeName: 'test' }],
  },
};

const store = createStore(state => state, {
  user: {
    uuid: 1234,
    initialized: true,
  },
  spotFilters: {
    maxDistance: 2.0,
    sports: {},
  },
});

storiesOf('Logo', module)
  .add('Default', () => <Logo />);

storiesOf('Basic components', module)
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

storiesOf('Text', module)
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

storiesOf('Onboarding', module).add('Default', () => <Onboarding navigation={dummyNavigator} />);

storiesOf('ImageSwiper', module).add('Default', () => (
  <ImageSwiper
    images={[
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv2CxOJIZX-hrhUZzyBcZ8t3_aJ6Zo0VFvs_loZIEpl_SkXUWJ0JeLTf-A',
      'https://via.placeholder.com/350x150',
    ]}
  />
));

storiesOf('NavBar', module)
  .add('Default', () => (
    <Provider store={store}>
      <NavBar navigation={dummyNavigator} />
    </Provider>
  ))
  .add('NavBarButton', () => (
    <NavBarButton icon={{ set: MaterialIcon, name: 'info' }} buttonText="test" />
  ))
  .add('At bottom', () => (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <NavBar navigation={dummyNavigator} />
      </View>
    </Provider>
  ));

storiesOf('NavDots', module).add('Default', () => <NavDots count={5} active={3} />);

storiesOf('Rating', module)
  .add('1', () => <Rating rating={1} />)
  .add('3', () => <Rating rating={3} />)
  .add('4.5', () => <Rating rating={4.5} />);

storiesOf('RatingBig', module)
  .add('1', () => <RatingBig rating={1} />)
  .add('3', () => <RatingBig rating={3} />)
  .add('4.5', () => <RatingBig rating={4.5} />);

storiesOf('Slider', module).add('Default', () => <Slider value={0.75} />);


storiesOf('PropertyCircle', module).add('Propertycircle', () => (
  <View>
    {['blablabla', 'ASD GDS ASD DAS', 'as asdasdasdsadassadas', '+4', 'HMMMM'].map((text, idx) => (
      <PropertyCircle text={text} key={idx} />
    ))}
  </View>
));

const users = require('../Fixtures/users');

storiesOf('UserCircle', module).add('UserCircle', () => (
  <View>{users.slice(0, 3).map((user, idx) => <UserCircle user={user} key={idx} />)}</View>
));
storiesOf('SignupScreen', module).add('Default', () => (
  <Provider store={store}>
    <SignupScreen navigation={dummyNavigator} />
  </Provider>
));

storiesOf('NothingFound', module).add('Default', () => (
  <NothingFound
    icon="map-marker"
    text="Oops, nothing found"
  />
));
