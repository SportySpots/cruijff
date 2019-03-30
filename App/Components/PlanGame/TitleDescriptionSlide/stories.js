import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../../Common/Block';
import TitleDescriptionSlide from '.';

storiesOf('PlanGame.TitleDescriptionSlide', module)
  .add('TitleDescriptionSlide white theme', () => (
    <Block bgColor="primaryGreen">
      <TitleDescriptionSlide
        theme="white"
        title="I'm the title"
        description="Some random description"
      />
    </Block>
  ));
