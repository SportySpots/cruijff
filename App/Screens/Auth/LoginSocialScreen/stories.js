import { storiesOf } from '@storybook/react-native';
import React from 'react';
import navigation from './mocks';
import LoginSocialScreen from '.';

storiesOf('Screen.Auth', module)
  .add('LoginSocialScreen', () => <LoginSocialScreen navigation={navigation} />);
