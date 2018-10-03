import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import Block from '../../Common/Block';
import ShareForm from './index';

storiesOf('PlanGame.ShareForm', module)
  .add('ShareForm white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <ShareForm gameUUID="455" />
    </Block>
  ));
