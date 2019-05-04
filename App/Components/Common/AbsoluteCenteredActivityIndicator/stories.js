import { storiesOf } from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components/native';
import AbsoluteCenteredActivityIndicator from '.';

const Relative = styled.View`
  flex: 1; /* full height */
  position: relative;
  background-color: ${({ theme }) => theme.colors.concrete};
`;

storiesOf('Common.AbsoluteCenteredActivityIndicator', module)
  .add('AbsoluteCenteredActivityIndicator', () => (
    <Relative>
      <AbsoluteCenteredActivityIndicator />
    </Relative>
  ))
  .add('AbsoluteCenteredActivityIndicator secondary', () => (
    <Relative>
      <AbsoluteCenteredActivityIndicator secondary />
    </Relative>
  ));
