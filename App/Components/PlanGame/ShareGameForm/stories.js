import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import Block from '../../Common/Block';
import ShareGameForm from './index';

storiesOf('PlanGame.ShareGameForm', module)
  .add('ShareGameForm white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <ShareGameForm gameUUID="455" />
    </Block>
  ));
