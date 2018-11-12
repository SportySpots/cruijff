import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import OnboardingScreen from '../Screens/OnboardingScreen';
import ImageSwiper from './Common/ImageSwiper';
import FlatButton from './Common/FlatButton';
import Text from './Common/Text';
import Logo from './Common/Logo';
import Rating from './Common/Rating';
import RatingBig from './Common/RatingBig';
import NothingFound from './Common/NothingFound';

// TODO: move stories to individual component's folder
const dummyNavigator = {
  navigate: () => null,
  state: {
    index: 0,
    routes: [{ routeName: 'test' }],
  },
};

storiesOf('Logo', module)
  .add('Default', () => <Logo />);

storiesOf('Basic components', module)
  .add('FlatButton', () => <FlatButton text="SUBMIT" />);

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

storiesOf('Onboarding', module).add('Default', () => <OnboardingScreen onSuccessHook={() => null} navigation={dummyNavigator} />);

storiesOf('ImageSwiper', module).add('Default', () => (
  <ImageSwiper
    images={[
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv2CxOJIZX-hrhUZzyBcZ8t3_aJ6Zo0VFvs_loZIEpl_SkXUWJ0JeLTf-A',
      'https://via.placeholder.com/350x150',
    ]}
  />
));

storiesOf('Rating', module)
  .add('1', () => <Rating rating={1} />)
  .add('3', () => <Rating rating={3} />)
  .add('4.5', () => <Rating rating={4.5} />);

storiesOf('RatingBig', module)
  .add('1', () => <RatingBig rating={1} />)
  .add('3', () => <RatingBig rating={3} />)
  .add('4.5', () => <RatingBig rating={4.5} />);

/* storiesOf('SignupScreen', module).add('Default', () => (
  <Provider store={store}>
    <SignupScreen navigation={dummyNavigator} />
  </Provider>
)); */

storiesOf('NothingFound', module).add('Default', () => (
  <NothingFound
    icon="map-marker"
    text="Oops, nothing found"
  />
));
