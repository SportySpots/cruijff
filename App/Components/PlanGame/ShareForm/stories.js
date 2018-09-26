import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import Block from '../../Common/Block';
import DescriptionForm from './index';

storiesOf('PlanGame.DescriptionForm', module)
  .add('DescriptionForm white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <DescriptionForm theme="white" />
    </Block>
  ));
