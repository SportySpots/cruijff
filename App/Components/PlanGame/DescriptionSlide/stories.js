import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import Block from '../../Common/Block';
import DescriptionSlide from './index';

storiesOf('PlanGame.DescriptionSlide', module)
  .add('DescriptionSlide white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <DescriptionSlide theme="white" descriptionMaxChars={100} description="random description"/>
    </Block>
  ));
