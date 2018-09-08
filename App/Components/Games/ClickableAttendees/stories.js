import { storiesOf } from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components';
import Mocks from '../../../../storybook/mocks';
import ClickableAttendees from './index';

const Container = styled.View`
  border: 1px solid black;
`;

storiesOf('Games.ClickableAttendees', module)
  .add('ClickableAttendees', () => (
    <Container>
      <ClickableAttendees game={Mocks.game} />
    </Container>
  ))
  .add('ClickableAttendees maxLength 2', () => (
    <Container>
      <ClickableAttendees
        game={Mocks.game}
        maxLength={2}
      />
    </Container>
  ));
