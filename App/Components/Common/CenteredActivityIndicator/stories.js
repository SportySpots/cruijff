import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenteredActivityIndicator from '.';

storiesOf('Common.CenteredActivityIndicator', module)
  .add('CenteredActivityIndicator', () => <CenteredActivityIndicator />)
  .add('CenteredActivityIndicator secondary', () => <CenteredActivityIndicator secondary />);
