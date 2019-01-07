import { storiesOf } from '@storybook/react-native';
import React from 'react';
import navigation from './mocks';
import SignupSocialScreen from '.';

storiesOf('Screen.Auth', module)
  .add('SignupSocialScreen', () => <SignupSocialScreen navigation={navigation} />);
