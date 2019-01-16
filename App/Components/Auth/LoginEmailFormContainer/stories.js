import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import LoginEmailFormContainer from '.';

storiesOf('Auth.LoginEmailFormContainer', module)
  .add('LoginEmailFormContainer', () => (
    <LoginEmailFormContainer title="I'm the title">
      <View><Text>Im the child</Text></View>
    </LoginEmailFormContainer>
  ));
