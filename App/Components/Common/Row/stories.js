import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import Row from '.';

const Container = styled.View`
  height: 180px;
  border: 1px solid black;
`;

storiesOf('Common.Row', module)
  .add('Row', () => (
    <Container>
      <Row>
        <Text>I&apos;m inside a Row :)</Text>
      </Row>
    </Container>
  ));
