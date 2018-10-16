import { storiesOf } from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components';
import Colors from '../../Themes/Colors';
import DarkFooterButton from './index';

const Container = styled.View`
  height: 50px;
  background-color: ${Colors.black}
`;

storiesOf('DarkFooterButton', module)
  .add('DarkFooterButton NEXT', () => (
    <Container>
      <DarkFooterButton
        text="INVITE"
      />
    </Container>
  ))
  .add('DarkFooterButton NEXT disabled', () => (
    <Container>
      <DarkFooterButton
        text="INVITE"
        disabled
      />
    </Container>
  ))
  .add('DarkFooterButton BACK', () => (
    <Container>
      <DarkFooterButton
        text="BACK"
        isBack
      />
    </Container>
  ));
