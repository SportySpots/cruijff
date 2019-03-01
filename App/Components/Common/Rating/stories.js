import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Rating from '.';

storiesOf('Common.Rating', module)
  .add('Rating 1', () => <Rating rating={1} />)
  .add('Rating 3', () => <Rating rating={3} />)
  .add('Rating 4.5', () => <Rating rating={4.5} />);
