import { storiesOf } from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components/native';
import Block from '../../Common/Block';
import navigation from './mocks';
import NoGamesFound from '.';

const Container = styled(Block)`
  flex: 1;
`;

storiesOf('Games.NoGamesFound', module)
  .add('NoGamesFound', () => (
    <Container bgColor="concrete">
      <NoGamesFound navigation={navigation} />
    </Container>
  ));
